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
- Trois cartes courtes pour présenter les accompagnements, les méthodes et les preuves scientifiques, chacune avec un lien vers la page dédiée

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

## Structure prévue

- /app : pages Next.js (App Router)
- /components : composants réutilisables
- /content : contenu textuel et données structurées
- /public : images et ressources statiques

## SEO et référencement

- Les pages principales exportent des métadonnées via les metadata de Next.js App Router
- Les Open Graph et les URLs canoniques sont définies pour chaque page importante
- Un sitemap.xml et un robots.txt sont générés automatiquement depuis l’application
- Des JSON-LD Schema.org sont injectés sur l’accueil et la page Contact pour renforcer le référencement local
