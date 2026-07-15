# Projet Me Retrouver

## Objectif

Créer un site vitrine professionnel pour une activité d’hypnothérapie et de gestion du stress, avec une identité visuelle sobre, rassurante et crédible.

## Direction de design

- Palette professionnelle orientée bleu pétrole, vert émeraude, or et bordeaux
- Fond principal blanc cassé / bleu très clair désaturé, sans mode sombre
- Typographie avec une police display chaleureuse pour les titres et une police body lisible pour le contenu
- Composants récurrents : bouton CTA principal, carte de témoignage ou de référence, bandeau d’information discret

## Layout global

- Header sticky avec logo, navigation principale et bouton de prise de rendez-vous bien visible
- Navigation responsive avec menu hamburger sur mobile
- Footer comprenant mentions légales, liens rapides et rappel de sécurité sur l’absence de remplacement d’un avis médical

## Page d’accueil

- Hero principal centré sur la proposition de valeur autour du stress, du burnout, des phobies et des approches d’hypnose et de cohérence cardiaque
- Boutons d’action directs vers la prise de rendez-vous et l’exploration de la méthode
- Deux cartes courtes pour présenter les accompagnements et les méthodes, chacune avec un lien vers la page dédiée

## Page “Qui suis-je”

- Présentation personnelle avec photo de profil, bio modulaire et zones de texte à remplacer par le contenu réel
- Section de parcours avec formation suivie, années de pratique et approche personnelle
- Section “Pourquoi j’ai choisi cette voie” pour humaniser le propos et renforcer la confiance

## Page “Mes méthodes”

- Trois sections dédiées : hypnose, cohérence cardiaque et rythmes binauraux
- L’hypnose et la cohérence cardiaque sont présentées comme des méthodes avec un niveau de preuve scientifique solide
- Les rythmes binauraux sont présentés comme un complément de confort sensoriel, avec un niveau de preuve scientifique nettement plus faible

## Page “Mes accompagnements”

- Trois sous-sections dédiées : Stress & burnout, Phobies, Troubles liés au stress post-traumatique
- Pour chaque rubrique : texte de présentation, signes ou situations concernées, et ce à quoi peut ressembler l’accompagnement
- Rappel discret en bas de chaque section : “Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.”

## Page “Témoignages”

- Grille de cartes réutilisables avec nom ou initiales, photo optionnelle, texte du témoignage et note si pertinente
- Données d’exemple temporaires à remplacer par de vrais témoignages avec consentement écrit

## Page “Tarifs”

- Présentation du déroulé type d’une séance, avec durée et premier rendez-vous
- Tarif unique de 70 € la séance d’1 heure, avec mention des remboursements possibles via certaines mutuelles
- Présentation des possibilités de séance à domicile ou en visio, ainsi qu’un bouton de prise de rendez-vous en fin de page

## Prise de rendez-vous

- Tous les boutons “Prendre RDV” redirigent vers une URL externe system.io via la variable d’environnement NEXT_PUBLIC_BOOKING_URL
- Si cette variable n’est pas définie, le bouton bascule vers un lien mailto temporaire pour éviter une rupture de parcours
- Les liens s’ouvrent dans un nouvel onglet lorsqu’une URL externe est fournie

## Fonctionnalités attendues

- Présentation claire de la pratique et des services proposés
- Mise en avant de l’accompagnement autour du bien-être, du stress et de la gestion émotionnelle
- Intégration d’un bouton de prise de rendez-vous via system.io
- Structure simple et élégante, compatible avec un premier lancement rapide
- Gestion des métadonnées SEO par page avec title, description et Open Graph
- Génération d’un sitemap.xml et d’un robots.txt pour le référencement technique
- Intégration de données structurées Schema.org LocalBusiness / MedicalBusiness sur l’accueil et la page Contact
- Intégration de Google Analytics 4 avec un événement de conversion dédié au clic sur les boutons “Prendre RDV”
- Création des pages “Mentions légales” et “Politique de confidentialité” avec une structure standard conforme RGPD (responsable du traitement, données collectées via le formulaire de contact, durée de conservation, droits d’accès/suppression)
- Harmonisation visuelle des espacements et transitions sur l’ensemble du site, avec une palette cohérente et des cartes plus sobres sur l’accueil
- Suppression du menu “Preuves scientifiques” et de la page associée, afin d’alléger l’arborescence et renforcer la cohérence du parcours utilisateur

## Structure du projet

```
/app                    Pages Next.js (App Router)
/components
  /about                Composants page Qui suis-je
  /layout               PageShell, PageHeader, ContactDetails
  /methods              Composants page Méthodes
  /pricing              Composants page Tarifs
  /seo                  JSON-LD Schema.org
  /services             Composants page Accompagnements
  /testimonials         Composants page Témoignages
  /ui                   BookingButton et éléments UI
  site-layout.tsx       Header, navigation et footer
/content                Données textuelles et configuration centralisée
  site.ts               Config globale (URL, contact, navigation, sitemap, schema)
  home.ts               Contenu page d’accueil
  about.ts              Contenu page Qui suis-je
  services.ts           Données accompagnements
  methods.ts            Données méthodes
  testimonials.ts       Données témoignages
  pricing.ts            Données tarifs
/lib
  seo.ts                Helper createPageMetadata() pour les métadonnées SEO
/public                 Images et ressources statiques
```

## Architecture et maintenabilité

### Configuration centralisée (`content/site.ts`)

Toutes les informations globales du site sont regroupées dans un seul fichier :

- Nom, tagline, URL de base, description
- Coordonnées (téléphone, e-mail, adresse)
- Liens de navigation (`navLinks`)
- Routes du sitemap (`sitemapRoutes`)
- Générateur de schéma JSON-LD (`createBusinessSchema`)

Pour modifier le téléphone, l’e-mail ou l’URL du site, il suffit d’éditer `content/site.ts`.

### Contenu séparé de la présentation

Les textes et données structurées de chaque page sont dans `/content`. Les pages dans `/app` se limitent à assembler composants et données. Les composants dans `/components` gèrent uniquement le rendu.

### Composants de layout réutilisables

- `PageShell` : conteneur standardisé (remplace les `<main>` imbriqués invalides)
- `PageHeader` : en-tête de page uniforme (eyebrow, titre, description)
- `ContactDetails` : bloc téléphone/e-mail réutilisé sur Contact et Qui suis-je

### SEO unifié (`lib/seo.ts`)

La fonction `createPageMetadata()` génère automatiquement title, description, canonical et Open Graph pour chaque page à partir d’un chemin et d’une description.

### Classes CSS partagées (Tailwind)

Les classes utilitaires définies dans `tailwind.config.ts` assurent la cohérence visuelle :

- `.page-shell` : conteneur de page
- `.page-section` : section avec bordure, ombre et padding
- `.card-surface` : carte légère
- `.btn-cta-primary` : bouton CTA principal
- `.info-banner` : bandeau d’information

## SEO et référencement

- Les pages principales exportent des métadonnées via `createPageMetadata()` de `lib/seo.ts`
- Les Open Graph et les URLs canoniques sont définies pour chaque page importante
- Un sitemap.xml et un robots.txt sont générés automatiquement depuis `content/site.ts`
- Des JSON-LD Schema.org sont injectés sur l’accueil et la page Contact via `createBusinessSchema()`

## Refactoring récent (maintenabilité)

Corrections et optimisations apportées :

1. **Centralisation** : création de `/content` et `/lib/seo.ts` pour éliminer la duplication de données et de métadonnées
2. **Cohérence e-mail** : uniformisation sur `contact@meretrouver.fr` (suppression du format `contact[at]`)
3. **HTML valide** : suppression des balises `<main>` imbriquées dans les pages (le layout global gère déjà `<main>`)
4. **Navigation Next.js** : remplacement des `<a href>` par `<Link>` sur l’accueil
5. **Styles harmonisés** : adoption de `.page-section` sur toutes les sections (y compris mentions légales et politique de confidentialité)
6. **Contact cliquable** : liens `tel:` et `mailto:` dans le composant `ContactDetails`
7. **Types partagés** : les composants de section importent leurs types depuis les fichiers `content/`

## Variables d’environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BOOKING_URL` | URL system.io pour la prise de rendez-vous |
| `NEXT_PUBLIC_GA_ID` | Identifiant Google Analytics 4 |

## Commandes

```bash
npm run dev    # Serveur de développement
npm run build  # Build de production
npm run start  # Serveur de production
npm run lint   # Vérification ESLint
```
