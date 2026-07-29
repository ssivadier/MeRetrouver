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
  done('4/6', 'Article généré');

  // ── 5. Création du fichier MDX ────────────────────────────

  log('5/6', 'Création du fichier MDX...');

  // S'assurer que le slug est propre
  const slug = generated.slug || slugify(generated.title);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.warn(`⚠️  Le fichier ${slug}.mdx existe déjà. Ajout d'un suffixe.`);
    const altSlug = `${slug}-${Date.now()}`;
    const altPath = path.join(BLOG_DIR, `${altSlug}.mdx`);
    fs.writeFileSync(altPath, generated.body);
    done('5/6', `Fichier créé : content/blog/${altSlug}.mdx (publié: false)`);
    // Update slug for email
    generated.slug = altSlug;
  } else {
    fs.writeFileSync(filePath, generated.body);
    done('5/6', `Fichier créé : content/blog/${slug}.mdx (publié: false)`);
  }

  // ── 6. Log du sujet ───────────────────────────────────────

  log('6/6', 'Enregistrement dans le journal des sujets...');
  addTopic({
    slug: generated.slug || slug,
    title: generated.title,
    generatedAt: new Date().toISOString(),
    sourceUrl: sourceArticle?.url,
    sourceTitle: sourceArticle?.title,
    scientificRefs: scientificRefs.map(r => r.url),
  });
  done('6/6', 'Sujet enregistré dans content/blog-topics.json');

  // ── 7. Email ──────────────────────────────────────────────

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

  console.log('\n═══════════════════════════════════════════════');
  console.log('   ✅ Article généré avec succès');
  console.log('═══════════════════════════════════════════════\n');
  console.log(`  Titre       : ${generated.title}`);
  console.log(`  Description : ${generated.description}`);
  console.log(`  Fichier     : content/blog/${generated.slug || slug}.mdx`);
  console.log(`  Statut      : BROUILLON (published: false)`);
  console.log(`\n  Pour publier :`);
  console.log(`  1. Relis le fichier`);
  console.log(`  2. Passe published: true dans le frontmatter`);
  console.log(`  3. Commit et push\n`);
}

main().catch((err) => {
  console.error('\n❌ Erreur :', err);
  process.exit(1);
});
