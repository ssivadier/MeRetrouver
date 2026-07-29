/**
 * Extracteur JSON robuste — tolérant aux erreurs fréquentes des LLM.
 * Fonctionne avec OpenAI, Groq, Gemini et tout autre provider.
 */

/**
 * Nettoie et tente d'extraire un JSON valide depuis une réponse texte.
 * Gère : code blocks, texte avant/après, trailing commas, single quotes, clés non quotées.
 */
export function extractJSON<T = Record<string, unknown>>(text: string): T {
  const cleaned = preclean(text);
  const candidates = extractCandidates(cleaned);
  const errors: string[] = [];

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      const repaired = repairJSON(candidate);
      try {
        return JSON.parse(repaired) as T;
      } catch (e) {
        errors.push(`Failed to parse candidate: ${(e as Error).message}`);
      }
    }
  }

  // Dernier recours : parsing laxiste via Function
  for (const candidate of candidates) {
    try {
      const loose = looseParse(candidate);
      if (loose !== null) return loose as T;
    } catch {
      // ignore
    }
  }

  throw new Error(
    `Impossible d'extraire un JSON valide après ${candidates.length} tentative(s).\n` +
    `Erreurs : ${errors.join('; ')}\n` +
    `Texte reçu (début) : ${text.substring(0, 500)}`,
  );
}

/**
 * Nettoyage préalable : enlève les espaces invisibles, normalise.
 */
function preclean(text: string): string {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, '')       // zero-width spaces
    .replace(/\r\n/g, '\n')
    .trim();
}

/**
 * Extrait tous les candidats JSON possibles depuis le texte.
 */
function extractCandidates(text: string): string[] {
  const candidates: string[] = [];

  // 1. Bloc de code markdown ```json ... ```
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const block = match[1].trim();
    if (block) candidates.push(block);
  }

  // 2. Objet JSON délimité par { }
  const braceRegex = /\{[\s\S]*\}/g;
  while ((match = braceRegex.exec(text)) !== null) {
    const block = match[0].trim();
    if (block && !candidates.includes(block)) {
      candidates.push(block);
    }
  }

  // 3. Tableau JSON délimité par [ ]
  const bracketRegex = /\[[\s\S]*\]/g;
  while ((match = bracketRegex.exec(text)) !== null) {
    const block = match[0].trim();
    if (block && !candidates.includes(block)) {
      candidates.push(block);
    }
  }

  // Si rien trouvé, le texte entier
  if (candidates.length === 0) {
    candidates.push(text);
  }

  return candidates;
}

/**
 * Répare les erreurs JSON les plus fréquentes.
 */
function repairJSON(json: string): string {
  let s = json;

  // Trailing commas avant } ou ]
  s = s.replace(/,\s*([}\]])/g, '$1');

  // Single quotes → double quotes (mais pas à l'intérieur des chaînes)
  // Simple: remplacer les ' entourant les clés et les valeurs string
  s = s.replace(/'(true|false|null|\d+)'/g, '$1');         // ne pas quoter les booléens/nombres
  s = s.replace(/:\s*'([^']*?)'/g, ': "$1"');              // valeurs: 'valeur' → "valeur"
  s = s.replace(/,\s*'([^']*?)'\s*:/g, ', "$1":');         // clés: 'clé': → "clé":
  s = s.replace(/^\s*'([^']*?)'\s*:/g, '"$1":');           // première clé

  // Clés non quotées (ex: { title: "foo" })
  s = s.replace(/(\{|,)\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // Backslash non échappés
  s = s.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');

  return s;
}

/**
 * Parser laxiste via new Function (dernier recours).
 * Transforme un objet JS-like en JSON valide.
 */
function looseParse(text: string): unknown | null {
  // On accepte uniquement les objets/dictionnaires simples
  const trimmed = text.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return null;

  // On remplace les valeurs non quotées (sauf booléens, nombres, null, objets, tableaux)
  let s = trimmed;

  // Échapper les retours à la ligne dans les chaînes
  s = s.replace(/:\s*"([^"]*?)"/g, (m) => m.replace(/\n/g, '\\n'));

  try {
    // Construction prudente : on crée un objet via Function
    // Mais c'est potentiellement dangereux, donc on valide d'abord la structure
    if (/[<>&]/.test(s)) return null; // pas de HTML/XML

    const result = new Function(`"use strict"; return (${s});`)();
    return result;
  } catch {
    return null;
  }
}
