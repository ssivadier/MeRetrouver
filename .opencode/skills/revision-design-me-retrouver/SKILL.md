---
name: revision-design-me-retrouver
description: >
  Audit de design complet du site Me Retrouver par rapport à son identité
  de marque établie. Utilise ce skill dès qu'on te montre une capture
  d'écran, une maquette, un lien ou un extrait de code d'une page du site
  et qu'on te demande un avis, une revue, une analyse, ou "est-ce que ça
  va", même sans le mot "design". Sers-t'en aussi pour toute question du
  type "qu'est-ce qui cloche", "comment améliorer", "est-ce cohérent avec
  la marque", ou avant de valider un nouvel écran/composant produit pour
  le site. L'objectif est de comparer systématiquement ce qui est montré
  aux critères de marque définis ci-dessous, et de rendre un verdict
  concret plutôt qu'un ressenti général.
---

# Audit de design — Me Retrouver

## Comment utiliser ce skill

Face à toute capture, maquette ou page du site, passe la grille de
critères ci-dessous dans l'ordre. Pour chaque section : dis explicitement
ce qui est conforme, ce qui ne l'est pas, et l'action corrective concrète
(pas juste "à revoir" — donne la valeur ou le changement précis).

Termine toujours par un verdict global en une phrase, puis une liste
priorisée (1-2 corrections maximum en priorité haute, le reste en
secondaire) — jamais une liste plate de dix remarques sans hiérarchie.

---

## Grille de critères

### 1. Couleurs
- Fond principal : blanc cassé chaud (`#FBF7F0` → `#F4ECDD`) — jamais
  de gris-vert froid, jamais de blanc pur clinique
- Dosage des accents : émeraude (`#1F6E5C`-`#2E8B7A`) dominant ~60%,
  or (`#D9A441`-`#E8B95F`) ~30%, bordeaux (`#6B2333`) ~10% max et jamais
  en couleur dominante d'un bloc
- Alerte si : une seule couleur (souvent le vert) porte tout le poids
  visuel de la page, ou si l'or/le bordeaux sont totalement absents

### 2. Typographie
- Titres en serif roman (Cormorant Garamond, poids 500-700), en
  minuscules (jamais de majuscules espacées — trop corporate/froid
  pour ce positionnement)
- Corps de texte en sans-serif (Inter, poids 400-700), 15px minimum
- Hiérarchie claire entre titre, sous-titre, corps — un seul niveau
  d'emphase par bloc de texte

### 3. Logo et motif signature
- Logo toujours sur fond transparent, zone de protection respectée,
  jamais recoloré hors palette, jamais déformé
- Le motif "chemin" doit rester une ligne ouverte ou une texture légère
  (10-20% d'opacité) — alerte immédiate si un motif ressemble à une
  spirale fermée, un vortex, ou tout symbole qui pourrait évoquer un
  cliché ésotérique ou un symbole de fiction (ce risque a déjà été
  identifié une fois, à surveiller systématiquement)
- Le motif ne doit jamais capter plus l'attention que le contenu ou le
  bouton d'action principal

### 4. Imagerie
- Aucune photo de stock clichée (galets zen, lac au coucher de soleil,
  mains en prière, lotus, cerveaux stylisés) — signal de vigilance
  immédiat si ce type d'image apparaît
- Priorité à la présence humaine réelle (photo du praticien) plutôt
  qu'à l'illustration ou au stock générique
- À défaut de photo humaine disponible : fond uni ou motif texturé de
  la marque, jamais un compromis vers l'image de stock

### 5. Contenu et vocabulaire
- "Accompagner", jamais "traiter/soigner/guérir"
- Formulations qui désamorcent la culpabilité plutôt que des tournures
  neutres ou techniques
- Mention de sécurité présente sur les sujets sensibles (trauma,
  phobies) : rappel qu'un accompagnement ne remplace pas un suivi
  médical si besoin

### 6. Expérience et hiérarchie d'interaction
- Un seul point focal par écran, le regard doit savoir où aller
  immédiatement
- Le CTA "Prendre RDV" reste visible et accessible en permanence
  (header sticky), sans ton urgent ni pression artificielle (pas de
  compte à rebours, pas de "plus que X places")
- Espace négatif généreux — la densité visuelle nourrit l'anxiété,
  pas la confiance
- Animations et transitions : 300-500ms, easing doux, jamais de
  mouvement brusque ou de rebond

### 7. Accessibilité
- Contraste WCAG AA minimum, y compris sur fond clair
- Cible tactile 44px minimum sur les éléments interactifs
- Focus clavier toujours visible
- Texte courant 16px minimum

---

## Anti-patterns à signaler sans hésiter

- Couleurs vives non désaturées en grande surface
- Iconographie générique de stock (yin-yang, lotus, cerveaux stylisés)
- Animations gadget (parallax agressif, particules, hover exagéré)
- Formulaires de plus de 3-4 champs avant tout point de contact humain
- Toute urgence artificielle dans le tunnel de conversion
- Motif signature trop appuyé, dense, ou qui se referme en boucle

## Quand recommander une image plutôt qu'une correction en code

Si un problème visuel (texture, dégradé complexe, motif riche) ne peut
pas être corrigé proprement en CSS sans compromis de qualité, le dire
explicitement plutôt que de proposer un correctif en code qui ferait
un résultat "presque bien" — voir le skill de design pour la marche à
suivre de génération d'image dans ce cas.
