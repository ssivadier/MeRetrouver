/**
 * Générateur automatique d'articles de blog pour Me Retrouver.
 *
 * Flux :
 * 1. Récupère les actualités via GNews API
 * 2. IA sélectionne le meilleur sujet (évite les doublons)
 * 3. Recherche PubMed pour étayer scientifiquement
 * 4. IA génère l'article complet
 * 5. Crée le fichier MDX (published: false)
 * 6. Enregistre le sujet dans le log
 * 7. Envoie un email pour relecture
 *
 * Usage : npx tsx scripts/generate-blog-article.ts
 *
 * Variables d'environnement requises :
 *   GNEWS_API_KEY       — clé API GNews (gnews.io)
 *   AI_API_KEY          — clé API OpenAI (ou compatible)
 *   AI_BASE_URL         — URL de base API (optionnel, défaut OpenAI)
 *   AI_MODEL            — modèle (défaut: gpt-4o)
 *   EMAIL_HOST / PORT / USER / PASS / FROM / TO — configuration SMTP (Brevo recommandé)
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { fetchHealthNews } from './lib/gnews';
import { selectBestTopic, generateArticle, getScientificSearchTerms } from './lib/ai';
import { searchPubMed } from './lib/pubmed';
import { loadTopics, addTopic, isDuplicateTopic } from './lib/topics-log';
import { getEmailConfig, sendReviewEmail } from './lib/email';
import { downloadArticleImage } from './lib/images';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// ── Helpers ──────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function log(step: string, msg: string) {
  console.log(`\n━━━ [${step}] ${msg}`);
}

function done(step: string, msg: string) {
  console.log(`  ✔ ${msg}`);
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  console.log('\n═══════════════════════════════════════════════');
  console.log('   Générateur d\'articles — Me Retrouver');
  console.log('═══════════════════════════════════════════════\n');

  // ── 0. Vérifications ──────────────────────────────────────

  if (!process.env.GNEWS_API_KEY) {
    console.error('❌ GNEWS_API_KEY manquante dans .env.local');
    console.error('   Crée un compte gratuit sur https://gnews.io/ pour obtenir une clé');
    process.exit(1);
  }

  if (!process.env.AI_API_KEY) {
    console.error('❌ AI_API_KEY manquante dans .env.local');
    console.error('   Ajoute ta clé API OpenAI (ou autre fournisseur compatible)');
    process.exit(1);
  }

  // ── 1. Fetch GNews ────────────────────────────────────────

  log('1/6', 'Récupération des actualités via GNews...');
  let articles = await fetchHealthNews(process.env.GNEWS_API_KEY);
  if (articles.length === 0) {
    console.warn('⚠️  Aucun article trouvé via GNews. Le script va proposer un sujet original.');
  } else {
    done('1/6', `${articles.length} articles récupérés`);
  }

  // ── 2. Sélection IA du meilleur sujet ─────────────────────

  log('2/6', 'Sélection du meilleur sujet par IA...');
  const existingTopics = loadTopics();
  done('2/6', `${existingTopics.length} sujets déjà traités dans le log`);

  const selected = await selectBestTopic(articles, existingTopics);
  console.log(`  Sujet retenu : "${selected.title}"`);
  console.log(`  Angle : ${selected.angle}`);
  console.log(`  Raison : ${selected.reasoning}`);

  // Vérification doublon
  if (isDuplicateTopic(selected.title, existingTopics)) {
    console.warn(`\n⚠️  Ce sujet semble déjà avoir été traité. Vérifie le log : content/blog-topics.json`);
    console.warn('   Tu peux relancer le script pour obtenir un autre sujet.\n');
  }

  // ── 3. Recherche scientifique ─────────────────────────────

  log('3/6', 'Recherche d\'études scientifiques (PubMed)...');
  const searchTerms = await getScientificSearchTerms(selected.title, selected.angle);
  let scientificRefs: Awaited<ReturnType<typeof searchPubMed>> = [];

  if (searchTerms.length > 0) {
    console.log(`  Termes de recherche : ${searchTerms.join(', ')}`);

    for (const term of searchTerms) {
      const refs = await searchPubMed(term, 2);
      scientificRefs.push(...refs);
    }

    // Déduplication par PMID
    const seen = new Set<string>();
    scientificRefs = scientificRefs.filter(r => {
      if (seen.has(r.pmid)) return false;
      seen.add(r.pmid);
      return true;
    }).slice(0, 3);
  }

  if (scientificRefs.length > 0) {
    done('3/6', `${scientificRefs.length} référence(s) scientifique(s) trouvée(s)`);
    for (const ref of scientificRefs) {
      console.log(`    - ${ref.title} (${ref.year})`);
    }
  } else {
    console.log('  Aucune étude pertinente trouvée. L\'article sera basé sur les connaissances générales.');
  }

  // ── 4. Génération IA de l'article ─────────────────────────

  log('4/6', 'Génération de l\'article par IA...');
  const sourceArticle = selected.sourceIndex !== null ? articles[selected.sourceIndex] ?? null : null;

  const generated = await generateArticle(selected, sourceArticle, scientificRefs);
  done('4/7', 'Article généré');

  // ── 5. Téléchargement de l'image ──────────────────────────

  log('5/7', 'Téléchargement de l\'image d\'illustration...');
  const slug = generated.slug || slugify(generated.title);
  const imageUrl = await downloadArticleImage(slug, generated.imageKeyword, generated.imageAlt);
  if (imageUrl) {
    done('5/7', `Image téléchargée : ${imageUrl}`);
  } else {
    console.log('  Aucune image téléchargée (l\'article sera sans illustration).');
  }

  // ── 6. Création du fichier MDX ────────────────────────────

  log('6/7', 'Création du fichier MDX...');

  // Insérer l'image dans le body si disponible
  let body = generated.body;
  if (imageUrl) {
    const imgTag = `\n\n<img src="${imageUrl}" alt="${generated.imageAlt}" class="w-full rounded-xl my-6 shadow-soft" />\n\n`;
    // Insérer après le premier paragraphe de contenu (après le frontmatter)
    const bodyParts = body.split('\n\n');
    if (bodyParts.length >= 3) {
      // bodyParts[0] = frontmatter, bodyParts[1] = première ligne après ---
      bodyParts.splice(2, 0, imgTag.trim());
      body = bodyParts.join('\n\n');
    }
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.warn(`⚠️  Le fichier ${slug}.mdx existe déjà. Ajout d'un suffixe.`);
    const altSlug = `${slug}-${Date.now()}`;
    const altPath = path.join(BLOG_DIR, `${altSlug}.mdx`);
    fs.writeFileSync(altPath, body);
    done('6/7', `Fichier créé : content/blog/${altSlug}.mdx (publié: false)`);
    generated.slug = altSlug;
  } else {
    fs.writeFileSync(filePath, body);
    done('6/7', `Fichier créé : content/blog/${slug}.mdx (publié: false)`);
  }

  // ── 7. Log du sujet ───────────────────────────────────────

  log('7/7', 'Enregistrement dans le journal des sujets...');
  addTopic({
    slug: generated.slug || slug,
    title: generated.title,
    generatedAt: new Date().toISOString(),
    sourceUrl: sourceArticle?.url,
    sourceTitle: sourceArticle?.title,
    scientificRefs: scientificRefs.map(r => r.url),
    imageUrl: imageUrl ?? undefined,
  });
  done('7/7', 'Sujet enregistré dans content/blog-topics.json');

  // ── 8. Email ──────────────────────────────────────────────

  const emailConfig = getEmailConfig();
  if (emailConfig) {
    console.log('  Envoi de l\'email de notification...');
    try {
      await sendReviewEmail(emailConfig, {
        title: generated.title,
        description: generated.description,
        slug: generated.slug || slug,
        filePath: `content/blog/${generated.slug || slug}.mdx`,
      });
    } catch (err) {
      console.error(`  ❌ Échec envoi email : ${err}`);
    }
  }

  // ── Résumé ────────────────────────────────────────────────

  // Compter les mots du body (sans le frontmatter)
  const bodyContent = generated.body.replace(/^---[\s\S]*?---\n*/m, '').trim();
  const wordCount = bodyContent.split(/\s+/).length;

  console.log('\n═══════════════════════════════════════════════');
  console.log('   ✅ Article généré avec succès');
  console.log('═══════════════════════════════════════════════\n');
  console.log(`  Titre       : ${generated.title}`);
  console.log(`  Description : ${generated.description}`);
  console.log(`  Mots        : ${wordCount}${wordCount < 600 ? ' ⚠️  ATTENTION : l\'article est trop court, relance si < 800' : ''}`);
  console.log(`  Image       : ${imageUrl || 'aucune'}`);
  console.log(`  Fichier     : content/blog/${generated.slug || slug}.mdx`);
  console.log(`  Statut      : BROUILLON (published: false)`);
  console.log(`\n  Pour publier :`);
  console.log(`  1. Relis le fichier et vérifie le contenu`);
  console.log(`  2. Si pas d'image Pexels, remplace picsum par une vraie image`);
  console.log(`  3. Passe published: true dans le frontmatter`);
  console.log(`  4. Commit et push\n`);
}

main().catch((err) => {
  console.error('\n❌ Erreur :', err);
  process.exit(1);
});
