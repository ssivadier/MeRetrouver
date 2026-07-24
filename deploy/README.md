# Déploiement — Me Retrouver

Guide d'installation sur un VPS OVH (Ubuntu 22.04/24.04).

---

## Prérequis

- VPS OVH avec Ubuntu 22.04 ou 24.04
- Nom de domaine `meretrouver.fr` acheté
- Accès SSH root au VPS

---

## Étape 1 — DNS (chez OVH)

Dans l'administration OVH, va dans **Zone DNS** du domaine `meretrouver.fr` et crée ces enregistrements :

| Type | Sous-domaine | Cible |
|------|-------------|-------|
| A | `@` | `IP_DE_TON_VPS` |
| A | `www` | `IP_DE_TON_VPS` |

> Remplace `IP_DE_TON_VPS` par l'adresse IP publique de ton VPS.

---

## Étape 2 — Connexion au VPS

```bash
ssh root@IP_DE_TON_VPS
```

---

## Étape 3 — Setup du serveur

```bash
# Télécharger le script
mkdir -p /tmp/me-retrouver
cd /tmp/me-retrouver

# Option A : depuis GitHub
git clone https://github.com/ssivadier/MeRetrouver.git .
cd MeRetrouver/deploy

# Option B : copier les fichiers via scp depuis ta machine locale
# scp -r deploy/ root@IP_DE_TON_VPS:/tmp/me-retrouver/

chmod +x setup-server.sh
./setup-server.sh
```

Le script installe :
- Node.js 22 (via NVM)
- PM2 (gestion des process)
- Nginx (reverse proxy)
- Certbot (certificats SSL Let's Encrypt)
- Pare-feu UFW

---

## Étape 4 — Déployer le site

```bash
# Connexion en tant que deploy
su - deploy

# Cloner le repo
cd /opt/me-retrouver
git clone https://github.com/ssivadier/MeRetrouver.git .

# Configurer l'environnement
cp deploy/.env.example .env.local
nano .env.local  # Remplis les valeurs

# Lancer le déploiement
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

---

## Étape 5 — Vérifier

```bash
# Status PM2
pm2 status

# Logs en temps réel
pm2 logs me-retrouver

# Tester le site
curl -I https://meretrouver.fr
```

Le certificat SSL est automatiquement configuré par Certbot.

---

## Commandes utiles

| Action | Commande |
|--------|----------|
| Voir les logs | `pm2 logs me-retrouver` |
| Redémarrer | `pm2 restart me-retrouver` |
| Arrêter | `pm2 stop me-retrouver` |
| Déployer une mise à jour | `cd /opt/me-retrouver && git pull && npm ci --omit=dev && npm run build && pm2 reload me-retrouver` |
| Renouveler le SSL | `certbot renew` |
| Voir le statut Nginx | `systemctl status nginx` |

---

## Structure des fichiers sur le serveur

```
/opt/me-retrouver/          ← code source + build
├── app/
├── components/
├── content/
├── public/
├── .env.local              ← variables d'environnement (SECRET)
├── ecosystem.config.js     ← config PM2 (copié depuis deploy/)
└── ...

/etc/nginx/sites-available/me-retrouver  ← config Nginx
/home/deploy/.pm2/logs/                  ← logs PM2
```

---

## Sécurité

- Le site tourne avec l'utilisateur `deploy` (pas root)
- PM2 redémarre automatiquement en cas de crash
- SSL forcé via redirect HTTP→HTTPS
- Headers de sécurité configurés dans Next.js (CSP, HSTS, X-Frame-Options)
- Firewall UFW : seuls SSH (22), HTTP (80) et HTTPS (443) sont ouverts
