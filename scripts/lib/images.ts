import fs from 'fs';
import path from 'path';

const PUBLIC_IMG_DIR = path.join(process.cwd(), 'public', 'blog', 'images');

/**
 * Télécharge une image depuis Pexels (si PEXELS_API_KEY configurée)
 * ou depuis Lorem Picsum en fallback.
 * Sauvegarde dans public/blog/images/<slug>.jpg
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

  // Essayer Pexels si la clé est dispo
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (pexelsKey) {
    try {
      const imageUrl = await searchPexels(pexelsKey, keyword);
      if (imageUrl) {
        await downloadTo(imageUrl, localPath);
        return publicUrl;
      }
    } catch (err) {
      console.warn(`  ⚠️  Pexels échoué : ${err instanceof Error ? err.message : err}`);
    }
  }

  // Fallback : Lorem Picsum avec le slug comme seed
  try {
    const fallbackUrl = `https://picsum.photos/seed/${slug}/1200/600`;
    await downloadTo(fallbackUrl, localPath);
    return publicUrl;
  } catch (err) {
    console.warn(`  ⚠️  Lorem Picsum échoué : ${err instanceof Error ? err.message : err}`);
    return null;
  }
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
