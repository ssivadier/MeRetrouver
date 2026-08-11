import fs from 'fs';
import path from 'path';

const PUBLIC_IMG_DIR = path.join(process.cwd(), 'public', 'blog', 'images');

/**
 * Mots-clés de repli par catégorie détectée dans le slug/article.
 * Permet d'obtenir une image cohérente même si Pexels ne trouve rien
 * avec le mot-clé principal.
 */
const FALLBACK_QUERIES: Record<string, string[]> = {
  sommeil: ['sleep disorder night insomnia bedroom', 'person sleeping peacefully bed', 'relaxation bedtime routine'],
  stress: ['stress anxiety calm relaxation', 'overwhelmed tired person', 'meditation mindfulness stress relief'],
  anxiété: ['anxiety worried person therapy', 'panic attack calm breathing', 'stress management relaxation'],
  burnout: ['burnout exhausted office worker', 'tired overwhelmed employee desk', 'work stress fatigue recovery'],
  phobie: ['fear phobia anxiety therapy', 'scared anxious person comfort', 'fear overcome courage support'],
  hypnose: ['hypnosis therapy relaxation calm', 'hypnotherapy session peaceful', 'meditation trance relaxation'],
  fatigue: ['tired exhausted sleep deprived', 'fatigue chronic illness rest', 'energy exhaustion rest recovery'],
  respiration: ['breathing exercise meditation', 'breath calm relaxation yoga', 'mindful breathing stress relief'],
  émotion: ['emotional wellbeing mental health', 'therapy counseling support', 'emotions feelings calm peaceful'],
  santé: ['health wellness wellbeing lifestyle', 'self care mental health', 'healing recovery balance'],
};

/** Génère une liste de queries à essayer, par ordre de pertinence */
function buildQueries(slug: string, primaryKeyword: string): string[] {
  const queries: string[] = [];

  // 1. Mot-clé principal (le plus précis)
  if (primaryKeyword) queries.push(primaryKeyword);

  // 2. Mots-clés dérivés du slug
  const slugParts = slug.split('-').filter(w => w.length > 3);
  const category = Object.keys(FALLBACK_QUERIES).find(cat =>
    slug.includes(cat) || slug.includes(normalize(cat)),
  );
  if (category) {
    queries.push(...FALLBACK_QUERIES[category]);
  }

  // 3. Fallback ultra-générique si on a encore rien
  if (queries.length === 0) {
    queries.push('calm relaxation peaceful nature', 'wellness mindfulness therapy', 'mental health support care');
  }

  return queries;
}

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Télécharge une image depuis Pexels (si PEXELS_API_KEY configurée).
 * Essaie plusieurs mots-clés par ordre de pertinence.
 * Si rien trouvé, retourne null (pas d'image plutôt qu'une image hors-sujet).
 */
export async function downloadArticleImage(
  slug: string,
  keyword: string,
  alt: string,
): Promise<string | null> {
  const destDir = PUBLIC_IMG_DIR;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const localPath = path.join(destDir, `${slug}.jpg`);
  const publicUrl = `/blog/images/${slug}.jpg`;

  // Déjà téléchargée
  if (fs.existsSync(localPath)) {
    return publicUrl;
  }

  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!pexelsKey) {
    console.log('  ℹ️  Pas de clé Pexels — l\'article sera sans illustration.');
    return null;
  }

  // Essayer plusieurs queries par ordre de pertinence
  const queries = buildQueries(slug, keyword);
  for (const q of queries) {
    try {
      const imageUrl = await searchPexels(pexelsKey, q);
      if (imageUrl) {
        await downloadTo(imageUrl, localPath);
        console.log(`  ✔ Image trouvée sur Pexels (query: "${q}")`);
        return publicUrl;
      }
    } catch {
      // Essayer la query suivante
    }
  }

  console.log('  ℹ️  Aucune image pertinente trouvée sur Pexels — l\'article sera sans illustration.');
  return null;
}

/**
 * Cherche une image sur Pexels.
 */
async function searchPexels(apiKey: string, query: string): Promise<string | null> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`;

  const res = await fetch(url, {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Pexels error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const photos: Array<{ src: { large2x: string; large: string } }> = data.photos ?? [];
  if (photos.length === 0) return null;

  // Prendre large2x si dispo, sinon large
  return photos[0].src.large2x || photos[0].src.large;
}

/**
 * Télécharge une URL vers un fichier local.
 */
async function downloadTo(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} en téléchargeant ${url}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
}
