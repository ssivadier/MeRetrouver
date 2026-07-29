import type { GNewsArticle } from './gnews';
import type { TopicEntry } from './topics-log';
import type { PubMedRef } from './pubmed';
import { extractJSON } from './json-extract';

// ── Types partagés ──────────────────────────────────────────

export type SelectedTopic = {
  title: string;
  angle: string;
  reasoning: string;
  sourceIndex: number | null;
};

export type GeneratedArticle = {
  title: string;
  slug: string;
  description: string;
  body: string;
};

// ── Prompts système ─────────────────────────────────────────

const SYSTEM_SELECTION = `Tu es un éditeur de blog spécialisé dans la santé mentale, le stress et le bien-être.

À partir d'articles d'actualité et de la liste des sujets déjà traités, tu dois sélectionner LE sujet le plus prometteur pour générer le plus d'intérêt et de valeur pour les lecteurs.

Critères de sélection (par ordre d'importance) :
1. **Utilité pour le public cible** — des personnes épuisées, en stress/burnout, qui cherchent des solutions concrètes et bienveillantes
2. **Potentiel de trafic** — le sujet est actuel, recherché, ou répond à une question fréquente
3. **Originalité** — le sujet n'a pas été traité dans la liste des sujets existants
4. **Valeur ajoutée** — le sujet permet un article riche, nuancé, utile, pas un simple résumé d'actu

Réponds UNIQUEMENT au format JSON, sans texte avant ni après :
{
  "title": "Titre provisoire de l'article (en français, accrocheur mais pas putaclic)",
  "angle": "Angle éditorial : comment aborder le sujet",
  "reasoning": "Explication courte de pourquoi ce sujet a été choisi",
  "sourceIndex": "index (0-based) de l'article GNews sélectionné, ou null si aucun ne convient et qu'il faut partir d'une idée originale"
}`;

const SYSTEM_GENERATION = `Tu es un rédacteur expert en hypnothérapie, stress, burnout et bien-être mental pour le blog "Me Retrouver" — un site d'hypnothérapie basé à Pessac (33).

Tu dois générer un article de blog en français.

Règles strictes :

**Tonalité** :
- Empathique, client-focused, jamais alarmiste
- Utilise "accompagner" plutôt que "traiter/soigner/guérir"
- Les phrases sont courtes, percutantes. Un ton humain, pas académique
- Le "vous" est utilisé pour s'adresser au lecteur
- Aucune promesse de résultat — reste honnête et nuancé

**Structure** :
- Un premier paragraphe d'accroche qui plonge le lecteur dans le sujet
- 3 à 5 sections avec des sous-titres (##) qui racontent une progression
- Un paragraphe de transition vers la proposition d'accompagnement
- Une conclusion douce qui redonne du pouvoir au lecteur

**Contenu** :
- Ne copie pas les articles sources — réécris avec ton propre angle et des formulations originales
- Si des références scientifiques sont fournies, intègre-les naturellement (une par section max)
- N'invente aucune étude, aucun chiffre, aucune citation
- Reste dans le cadre de l'hypnothérapie et de la gestion du stress — pas de dérive ésotérique

**Format de réponse** :
Réponds UNIQUEMENT au format JSON, sans texte avant ni après :
{
  "title": "Titre de l'article",
  "slug": "slug-auto-genere",
  "description": "Une phrase d'accroche pour le meta-description (max 160 caractères)",
  "body": "Contenu complet au format Markdown, avec le frontmatter YAML --- inclus"
}`;

const SYSTEM_SEARCH_TERMS = 'Tu dois retourner des termes de recherche PubMed (en anglais) pour trouver des études scientifiques pertinentes sur le sujet donné. Retourne UNIQUEMENT un tableau JSON de 1 à 3 chaînes de recherche, sans texte avant ni après.';

// ── Retry wrapper ───────────────────────────────────────────

async function requestWithRetry(
  label: string,
  fn: () => Promise<string>,
  maxRetries = 2,
): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const text = await fn();
      if (!text || !text.trim()) throw new Error('Réponse vide');
      return text;
    } catch (err) {
      const isLast = attempt === maxRetries;
      const msg = err instanceof Error ? err.message : String(err);

      if (isLast) throw new Error(`${label} : ${msg}`);

      const wait = (attempt + 1) * 2000;
      console.warn(`  ⚠️  ${label} échouée (tentative ${attempt + 1}/${maxRetries + 1}) : ${msg.substring(0, 120)}`);
      console.warn(`     Nouvel essai dans ${wait / 1000}s...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw new Error(`${label} : échec après ${maxRetries + 1} tentatives`);
}

// ── Provider OpenAI / compatible ────────────────────────────

async function openAIJsonResponse(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const { default: OpenAI } = await import('openai');

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) throw new Error('AI_API_KEY manquante dans .env.local');

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.AI_BASE_URL || undefined,
  });

  const completion = await client.chat.completions.create({
    model: process.env.AI_MODEL || 'gpt-4o',
    temperature: 0,
    max_tokens: 4096,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) throw new Error('Réponse IA vide');
  return text;
}

// ── Provider Gemini ─────────────────────────────────────────

async function geminiJsonResponse(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) throw new Error('AI_API_KEY manquante dans .env.local');

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.AI_MODEL || 'gemini-2.0-flash';

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0,
      maxOutputTokens: 4096,
    },
  });

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  if (!text) throw new Error('Réponse IA vide');
  return text;
}

// ── Provider agnostique : raw text ──────────────────────────

type AIProvider = 'openai' | 'gemini';

function getProvider(): AIProvider {
  const p = (process.env.AI_PROVIDER || 'openai').toLowerCase();
  if (p === 'gemini') return 'gemini';
  return 'openai';
}

function jsonRaw(system: string, user: string): Promise<string> {
  const provider = getProvider();
  if (provider === 'gemini') return geminiJsonResponse(system, user);
  return openAIJsonResponse(system, user);
}

// ── Fonctions exportées avec parsing robuste ────────────────

export async function selectBestTopic(
  articles: GNewsArticle[],
  existingTopics: TopicEntry[],
): Promise<SelectedTopic> {
  const existingTitles = existingTopics.map((t) => `- ${t.title}`).join('\n');

  const articlesSummary = articles.map((a, i) =>
    `[${i}] "${a.title}" — ${a.description ?? '(pas de description)'}`,
  ).join('\n');

  const text = await requestWithRetry('Sélection du sujet', () =>
    jsonRaw(
      SYSTEM_SELECTION,
      `Voici les articles d'actualité disponibles :\n\n${articlesSummary}\n\nSujets déjà traités :\n${existingTitles || '(aucun)'}\n\nChoisis le meilleur sujet pour un article de blog à forte valeur ajoutée.`,
    ),
  );

  return extractJSON<SelectedTopic>(text);
}

export async function generateArticle(
  topic: SelectedTopic,
  sourceArticle: GNewsArticle | null,
  scientificRefs: PubMedRef[],
): Promise<GeneratedArticle> {
  const refsBlock = scientificRefs.length > 0
    ? `\nRéférences scientifiques disponibles à intégrer :\n${scientificRefs.map((r) => `- "${r.title}" (${r.authors}, ${r.year}, ${r.journal}) ${r.url}`).join('\n')}`
    : '\nAucune référence scientifique trouvée. N\'en invente pas.';

  const sourceBlock = sourceArticle
    ? `\nArticle source (inspiration, pas à copier) :\nTitre: ${sourceArticle.title}\nDescription: ${sourceArticle.description}\nContenu: ${sourceArticle.content.substring(0, 1500)}`
    : '';

  const today = new Date().toISOString().split('T')[0];

  const text = await requestWithRetry('Génération de l\'article', () =>
    jsonRaw(
      SYSTEM_GENERATION,
      `Génère un article de blog pour Me Retrouver.

Sujet : "${topic.title}"
Angle : "${topic.angle}"
${sourceBlock}
${refsBlock}

Utilise la date d'aujourd'hui (${today}) dans le frontmatter.

Le frontmatter YAML doit contenir : title, date, description, slug, published (false).
Le slug doit être en kebab-case.
published: false (c'est un brouillon pour relecture).

N'oublie pas de :
- Parler de l'accompagnement possible (sans être insistant)
- Ajouter <BookingCTA /> à la fin
- Ajouter un lien vers /accompagnements ou /methodes ou /test-stress dans la note de bas de page`,
    ),
  );

  return extractJSON<GeneratedArticle>(text);
}

export async function getScientificSearchTerms(title: string, angle: string): Promise<string[]> {
  try {
    const text = await requestWithRetry('Termes de recherche PubMed', () =>
      jsonRaw(
        SYSTEM_SEARCH_TERMS,
        `Sujet : "${title}"\nAngle : "${angle}"\n\nQuels termes de recherche PubMed (en anglais) utiliser pour trouver des études scientifiques pertinentes ?`,
      ),
    );

    const parsed = extractJSON<string[] | { terms: string[] }>(text);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
    if (parsed.terms && Array.isArray(parsed.terms)) return parsed.terms.slice(0, 3);
    return [];
  } catch {
    return [];
  }
}
