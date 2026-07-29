# Générateur automatique d'articles

Génère un article de blog pour Me Retrouver à partir de l'actualité (GNews) et d'une IA.

## Usage

```bash
npm run generate-article
```

Le script interactive en 7 étapes :
1. **GNews** — récupère les 25 dernières actualités FR (stress, burnout, hypnose, phobie)
2. **IA** — sélectionne le sujet le plus prometteur (évite les doublons)
3. **PubMed** — cherche des études scientifiques pour étayer l'article
4. **IA** — génère l'article complet (800+ mots, exercice pratique inclus)
5. **Image** — télécharge une illustration (Pexels ou Lorem Picsum)
6. **Fichier** — crée `content/blog/<slug>.mdx` (brouillon, `published: false`)
7. **Email** — envoie une notification pour relecture

## Configuration

Toutes les variables dans `.env.local` (à la racine du projet) :

```env
# ── Obligatoire ──

# GNews — https://gnews.io/ (gratuit, 100 req/jour)
GNEWS_API_KEY=...

# IA — voir les options ci-dessous
AI_API_KEY=...
AI_PROVIDER=openai
AI_BASE_URL=...
AI_MODEL=...

# ── Optionnel ──

# Image — https://pexels.com/api (gratuit)
# Si absent, utilise Lorem Picsum (images génériques)
PEXELS_API_KEY=...

# Email — notification après génération
# SMTP Brevo recommandé (smtp-relay.brevo.com:587)
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_FROM=...
EMAIL_TO=...
```

### Fournisseurs IA gratuits (sans carte bancaire)

| Provider | `AI_PROVIDER` | `AI_BASE_URL` | `AI_MODEL` |
|---|---|---|---|
| **Groq** (recommandé) | `openai` | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` |
| **OpenRouter** | `openai` | `https://openrouter.ai/api/v1` | `meta-llama/llama-3.3-70b-instruct:free` |
| **BazaarLink** | `openai` | `https://bazaarlink.ai/api/v1` | `auto:free` |
| **AINative Studio** | `openai` | `https://api.ainative.studio/v1` | `meta/llama-3.3-70b-instruct` |
| **Gemini** | `gemini` | — | `gemini-2.0-flash` |
| **OpenAI** (payant) | `openai` | — | `gpt-4o` |

## Publier un article

1. **Relis** le fichier généré dans `content/blog/<slug>.mdx`
2. Remplace `published: false` → `published: true` dans le frontmatter
3. **Regénère le site** avec `npm run build`
4. Redémarre le serveur ou commit/push pour le déploiement

> ⚠️ Le site est en SSG : les articles sont figés au moment du build. Après avoir modifié un fichier `.mdx`, il faut **toujours rebuild** pour voir les changements.

## Fichiers créés

| Fichier | Rôle |
|---|---|
| `content/blog/<slug>.mdx` | Article au format MDX (frontmatter YAML + Markdown + composants React) |
| `public/blog/images/<slug>.jpg` | Image d'illustration (si téléchargée) |
| `content/blog-topics.json` | Journal des sujets traités (anti-doublon) |

## Structure d'un article MDX

```mdx
---
title: "Titre de l'article"
date: "2026-08-19"
description: "Meta-description pour le SEO"
slug: "titre-de-larticle"
published: false
---

<img src="/blog/images/titre-de-larticle.jpg" alt="..." class="w-full rounded-xl my-6 shadow-soft" />

Contenu de l'article en Markdown...

<BookingCTA />

*Lien vers [les accompagnements](/accompagnements).*
```

## Dépannage

**L'article ne s'affiche pas après avoir mis `published: true`**
→ Relance `npm run build`. Le site est statique, un rebuild est nécessaire.

**L'IA répond du texte au lieu du JSON**
→ Le script retente automatiquement 2 fois. Si ça persiste, vérifie que le modèle supporte le format JSON.

**Pas d'image téléchargée**
→ Sans clé Pexels, le script utilise Lorem Picsum (image générique). Crée un compte gratuit sur pexels.com/api pour des images pertinentes.
