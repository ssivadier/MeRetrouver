import type { GNewsArticle } from './gnews';
import type { TopicEntry } from './topics-log';
import type { PubMedRef } from './pubmed';

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

Réponds UNIQUEMENT au format JSON :
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
Tu dois retourner UNIQUEMENT du JSON avec cette structure :
{
  "title": "Titre de l'article",
  "slug": "slug-auto-genere",
  "description": "Une phrase d'accroche pour le meta-description (max 160 caractères)",
  "body": "Contenu complet au format Markdown, avec le frontmatter YAML --- inclus"
}`;

const SYSTEM_SEARCH_TERMS = 'Tu dois retourner des termes de recherche PubMed (en anglais) pour trouver des études scientifiques pertinentes sur le sujet donné. Retourne UNIQUEMENT un tableau JSON de 1 à 3 chaînes de recherche.';

// ── Provider OpenAI ─────────────────────────────────────────

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
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) throw new Error('Réponse IA vide (OpenAI)');
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
    },
  });

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  if (!text) throw new Error('Réponse IA vide (Gemini)');
  return text;
}

// ── Sélection du provider ───────────────────────────────────

type AIProvider = 'openai' | 'gemini';

function getProvider(): AIProvider {
  const p = (process.env.AI_PROVIDER || 'openai').toLowerCase();
  if (p === 'gemini') return 'gemini';
  return 'openai';
}

function jsonResponse(system: string, user: string): Promise<string> {
  const provider = getProvider();
  if (provider === 'gemini') return geminiJsonResponse(system, user);
  return openAIJsonResponse(system, user);
}

// ── Fonctions exportées ─────────────────────────────────────

export async function selectBestTopic(
  articles: GNewsArticle[],
  existingTopics: TopicEntry[],
): Promise<SelectedTopic> {
  const existingTitles = existingTopics.map((t) => `- ${t.title}`).join('\n');

  const articlesSummary = articles.map((a, i) =>
    `[${i}] "${a.title}" — ${a.description ?? '(pas de description)'}`,
  ).join('\n');

  const text = await jsonResponse(
    SYSTEM_SELECTION,
    `Voici les articles d'actualité disponibles :\n\n${articlesSummary}\n\nSujets déjà traités :\n${existingTitles || '(aucun)'}\n\nChoisis le meilleur sujet pour un article de blog à forte valeur ajoutée.`,
  );

  return JSON.parse(text) as SelectedTopic;
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

  const text = await jsonResponse(
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
  );

  return JSON.parse(text) as GeneratedArticle;
}

export async function getScientificSearchTerms(title: string, angle: string): Promise<string[]> {
  const text = await jsonResponse(
    SYSTEM_SEARCH_TERMS,
    `Sujet : "${title}"\nAngle : "${angle}"\n\nQuels termes de recherche PubMed (en anglais) utiliser pour trouver des études scientifiques pertinentes ?`,
  );

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
    if (parsed.terms && Array.isArray(parsed.terms)) return parsed.terms.slice(0, 3);
    return [];
  } catch {
    return [];
  }
}
