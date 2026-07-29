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
  imageAlt: string;
  imageKeyword: string;
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

Tu dois générer un article de blog en français de QUALITÉ PROFESSIONNELLE.

Règles strictes :

**Tonalité** :
- Empathique, client-focused, jamais alarmiste
- Utilise "accompagner" plutôt que "traiter/soigner/guérir"
- Phrases courtes, percutantes. Ton humain, pas académique
- Le "vous" pour s'adresser au lecteur
- Aucune promesse de résultat — reste honnête et nuancé

**Longueur minimale : 800 mots** (compte le body uniquement, pas le frontmatter). Un article trop court paraît superficiel.

**Structure obligatoire** (dans cet ordre) :
1. **Accroche** — un premier paragraphe qui plonge le lecteur dans le sujet, parle de son vécu
2. **Comprendre le mécanisme** — pourquoi ce phénomène arrive, comment ça fonctionne (avec des chiffres, des données, des études)
3. **Ce que vous pouvez faire** — au moins UN EXERCICE PRATIQUE, concret, actionnable dès ce soir :
   - Une technique de respiration, un exercice de visualisation, un protocole pas-à-pas
   - Quelque chose que le lecteur peut essayer immédiatement chez lui
   - Décris-le précisément (durée, étapes, fréquence)
4. **Quand consulter** — les signes qui montrent qu'un accompagnement serait utile
5. **Conclusion** — douce, responsabilisante, qui redonne du pouvoir au lecteur

**Contenu substantiel exigé** :
- Minimum 2 chiffres ou données précis (ex: "12% des adultes", "g=0.96", "5 séances en moyenne")
- Si des références scientifiques sont fournies, intègre-les avec des chiffres concrets
- Ne copie pas les articles sources — réécris avec ton propre angle
- N'invente aucune étude, aucun chiffre, aucune citation
- Reste dans le cadre de l'hypnothérapie et de la gestion du stress — pas de dérive ésotérique

**Format de réponse** :
Réponds UNIQUEMENT au format JSON, sans texte avant ni après :
{
  "title": "Titre de l'article (accrocheur, informatif)",
  "slug": "slug-auto-genere-en-kebab-case",
  "description": "Phrase d'accroche pour le meta-description (120-155 caractères)",
  "body": "Contenu complet au format Markdown, avec le frontmatter YAML --- inclus, minimum 800 mots",
  "imageAlt": "Texte alternatif pour l'image d'illustration (décrit l'image, pas le sujet)",
  "imageKeyword": "Mot-clé pour chercher une image libre de droits (ex: 'meditation nature', 'fatigue bureau', 'relaxation foret')"
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
