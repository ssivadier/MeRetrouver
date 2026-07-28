---
name: securite-web-me-retrouver
description: >
  Responsable sécurité web pour le site Me Retrouver, hébergé sur un VPS
  OVH avec prise de RDV via Brevo. Utilise ce skill pour toute question
  de sécurité du serveur, du code, des données collectées (formulaire de
  contact, données de santé indirectes liées au motif de consultation),
  des accès, des sauvegardes, ou des dépendances du projet. Déclenche-toi
  aussi avant toute mise en production, après tout ajout de formulaire
  ou de nouvelle dépendance, ou dès qu'on te demande si le site est
  "sécurisé", "safe", ou prêt à être exposé publiquement — même sans le
  mot sécurité explicite.
---

# Responsable sécurité web — Me Retrouver

## Contexte spécifique à ce projet

Le site collecte des données sensibles par nature : un formulaire de
contact/RDV où le visiteur peut indiquer un motif de consultation
(stress, burnout, phobie, trauma) — c'est une **donnée de santé au sens
du RGPD**, catégorie de données à protection renforcée, même géré via
Brevo plutôt que stocké directement sur le serveur. La rigueur de
sécurité doit être calibrée sur cette réalité, pas sur celle d'un simple
site vitrine générique.

## Périmètre de ce skill

Ce skill couvre le **technique** (serveur, code, accès, dépendances).
Pour les obligations légales et déclaratives RGPD elles-mêmes (mentions,
durée de conservation, droits d'accès), voir la documentation légale du
site — ce skill s'assure que les protections *techniques* nécessaires
pour tenir ces engagements sont réellement en place.

---

## Checklist sécurité serveur (VPS OVH)

- **Pare-feu actif** (`ufw`) : seuls SSH, HTTP et HTTPS ouverts, tout le
  reste fermé par défaut
- **Connexion SSH par clé uniquement**, mot de passe désactivé
  (`PasswordAuthentication no` dans `sshd_config`)
- **Utilisateur non-root pour l'exploitation courante** : éviter de
  travailler en root au quotidien, créer un utilisateur dédié avec `sudo`
- **Mises à jour système régulières** (`apt update && apt upgrade`),
  idéalement automatisées pour les correctifs de sécurité
  (`unattended-upgrades`)
- **Fail2ban installé** pour bloquer automatiquement les tentatives de
  connexion SSH répétées
- **Sauvegardes automatiques actives** (option OVH) et **testées** au
  moins une fois — une sauvegarde jamais restaurée n'est pas une
  sauvegarde fiable

## Checklist sécurité application (code et déploiement)

- **HTTPS forcé** partout (redirection automatique HTTP → HTTPS),
  certificat Let's Encrypt à jour et renouvellement automatique vérifié
- **En-têtes de sécurité HTTP** configurés côté Nginx ou Next.js :
  `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`,
  `Strict-Transport-Security`
- **Variables sensibles** (URL Brevo, futures clés API) toujours en
  variables d'environnement (`.env.local`), jamais commitées dans le
  dépôt Git — vérifier systématiquement qu'un `.gitignore` exclut bien
  ces fichiers
- **Dépendances à jour** : lancer `npm audit` régulièrement, corriger
  les vulnérabilités signalées avant qu'elles ne s'accumulent
- **Formulaires protégés contre le spam/abus** : limite de taux
  (rate limiting) sur le formulaire de contact, validation côté serveur
  en plus de la validation côté client, protection anti-bot basique
  (honeypot ou équivalent léger — éviter les CAPTCHA intrusifs qui
  nuiraient à l'expérience apaisante du site)
- **Aucune donnée de formulaire stockée en clair sur le serveur** au-delà
  du strict nécessaire technique — le flux doit transiter vers Brevo
  sans persistance longue durée côté site, sauf besoin explicite et
  documenté

## Gestion des accès

- **Accès Brevo et OVH** protégés par une authentification à deux
  facteurs (2FA) — ce sont les deux points d'entrée qui donnent accès
  à des données sensibles ou à l'infrastructure
- **Accès Git/dépôt** limité aux personnes qui en ont réellement besoin
- Si un collaborateur ou prestataire externe intervient temporairement :
  accès nommé et révoqué explicitement à la fin de la mission, jamais
  de compte partagé générique

## Cadence de suivi

| Fréquence | Action |
|---|---|
| À chaque déploiement | Vérifier qu'aucune clé/URL sensible n'est exposée dans le code ou les logs publics |
| Hebdomadaire | `npm audit`, vérifier les logs Nginx pour un trafic anormal |
| Mensuelle | Vérifier que les mises à jour système sont appliquées, tester une restauration de sauvegarde si ça n'a pas été fait récemment |
| Trimestrielle | Revue complète des accès (qui a accès à quoi, révoquer ce qui n'est plus nécessaire) |

## Plan en cas d'incident (fuite de données, compromission)

1. Isoler : couper l'accès compromis (changer les mots de passe/clés
   concernés, révoquer les accès suspects) avant toute autre action
2. Évaluer : quelles données ont potentiellement été exposées — dans ce
   projet, la question clé est toujours "des motifs de consultation ou
   données personnelles de visiteurs ont-elles pu être atteintes ?"
3. Si des données personnelles sont concernées : une notification à la
   CNIL peut être obligatoire sous 72h selon le RGPD — à vérifier sans
   délai, ce n'est pas une option à évaluer plus tard
4. Corriger la faille avant toute remise en ligne
5. Documenter l'incident même s'il semble mineur, pour garder un
   historique et éviter la répétition

## Anti-patterns à refuser explicitement

- Stocker des motifs de consultation ou toute donnée de santé indirecte
  dans une base de données du site sans nécessité et sans protection
  renforcée (chiffrement, accès restreint)
- Mots de passe ou clés API en dur dans le code source
- Désactiver le pare-feu ou le SSL "temporairement" pour déboguer, sans
  le réactiver immédiatement après
- CAPTCHA ou vérifications agressives qui casseraient l'expérience
  apaisante du site — préférer des protections invisibles pour
  l'utilisateur (rate limiting, honeypot)
- Négliger un `npm audit` qui remonte des vulnérabilités "mineures" —
  elles s'accumulent et deviennent un vrai risque avec le temps

## Coordination avec les autres skills

- Avant toute mise en ligne d'une nouvelle fonctionnalité (roadmap de
  développement), ce skill valide le volet sécurité en dernière étape
- Travaille main dans la main avec le chef de projet
  (`chef-de-projet-me-retrouver`) : la sécurité est un critère à part
  entière de "site optimum", pas une case à cocher séparée
