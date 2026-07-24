#!/bin/bash
# =============================================================================
# Me Retrouver — Script de déploiement
# À exécuter depuis le serveur après le git clone
# =============================================================================
set -euo pipefail

APP_DIR="/opt/me-retrouver"
DOMAIN="meretrouver.fr"
PM2_APP="me-retrouver"

echo "========================================="
echo "  Me Retrouver — Déploiement"
echo "========================================="

# ── 1. Vérifier que .env existe ──────────────────────────────────────────────
if [ ! -f "$APP_DIR/.env.local" ]; then
  echo "❌ Fichier .env.local introuvable dans $APP_DIR"
  echo "   Copie le fichier .env.example en .env.local et remplis les valeurs."
  exit 1
fi

# ── 2. Installer les dépendances ────────────────────────────────────────────
echo "[1/4] Installation des dépendances..."
cd "$APP_DIR"
npm ci --omit=dev

# ── 3. Build ────────────────────────────────────────────────────────────────
echo "[2/4] Build de l'application..."
npm run build

# ── 4. SSL si premier deploy ────────────────────────────────────────────────
if ! [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "[3/4] Configuration du certificat SSL (Let's Encrypt)..."
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
    --non-interactive --agree-tos --email "contact@$DOMAIN" \
    --redirect
else
  echo "[3/4] SSL déjà configuré, renouvellement si nécessaire..."
  certbot renew --quiet || true
fi

# ── 5. Redémarrer PM2 ──────────────────────────────────────────────────────
echo "[4/4] Redémarrage de PM2..."
if pm2 describe "$PM2_APP" &>/dev/null; then
  pm2 reload "$PM2_APP"
else
  pm2 start ecosystem.config.js
fi
pm2 save

echo ""
echo "========================================="
echo "  ✅ Déploiement terminé !"
echo "========================================="
echo ""
echo "  Site live sur : https://$DOMAIN"
echo "  PM2 status    : pm2 status"
echo "  Logs          : pm2 logs $PM2_APP"
echo ""
