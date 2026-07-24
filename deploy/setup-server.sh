#!/bin/bash
# =============================================================================
# Me Retrouver — Setup serveur VPS OVH
# Ubuntu 22.04/24.04 — meretrouver.fr
# =============================================================================
set -euo pipefail

DOMAIN="meretrouver.fr"
APP_DIR="/opt/me-retrouver"
NODE_VERSION="22"
DEPLOY_USER="deploy"

echo "========================================="
echo "  Me Retrouver — Installation serveur"
echo "========================================="

# ── 1. Mise à jour système ──────────────────────────────────────────────────
echo "[1/8] Mise à jour du système..."
apt-get update -qq
apt-get upgrade -y -qq

# ── 2. Utilisateur deploy ───────────────────────────────────────────────────
echo "[2/8] Création de l'utilisateur deploy..."
if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG sudo "$DEPLOY_USER"
  # Clé SSH root → deploy (optionnel, commenté par défaut)
  # mkdir -p /home/$DEPLOY_USER/.ssh
  # cp /root/.ssh/authorized_keys /home/$DEPLOY_USER/.ssh/
  # chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
fi

# ── 3. Node.js via NVM ─────────────────────────────────────────────────────
echo "[3/8] Installation de Node.js $NODE_VERSION..."
if ! su - "$DEPLOY_USER" -c "command -v nvm" &>/dev/null; then
  su - "$DEPLOY_USER" -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash"
fi
su - "$DEPLOY_USER" -c "nvm install $NODE_VERSION"
su - "$DEPLOY_USER" -c "nvm use $NODE_VERSION"
su - "$DEPLOY_USER" -c "nvm alias default $NODE_VERSION"

# ── 4. PM2 ──────────────────────────────────────────────────────────────────
echo "[4/8] Installation de PM2..."
su - "$DEPLOY_USER" -c "npm install -g pm2"
su - "$DEPLOY_USER" -c "pm2 startup systemd -u $DEPLOY_USER --hp /home/$DEPLOY_USER" | tail -1

# ── 5. Nginx ────────────────────────────────────────────────────────────────
echo "[5/8] Installation de Nginx..."
apt-get install -y -qq nginx
systemctl enable nginx
systemctl start nginx

# ── 6. Certbot (Let's Encrypt) ──────────────────────────────────────────────
echo "[6/8] Installation de Certbot..."
apt-get install -y -qq certbot python3-certbot-nginx

# ── 7. Firewall ─────────────────────────────────────────────────────────────
echo "[7/8] Configuration du firewall..."
if command -v ufw &>/dev/null; then
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw --force enable
fi

# ── 8. Dossier de l'application ─────────────────────────────────────────────
echo "[8/8] Préparation du dossier /opt/me-retrouver..."
mkdir -p "$APP_DIR"
chown "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

# ── Nginx config (sans SSL pour l'instant) ───────────────────────────────────
cat > /etc/nginx/sites-available/me-retrouver <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name meretrouver.fr www.meretrouver.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/me-retrouver /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "========================================="
echo "  ✅ Serveur prêt !"
echo "========================================="
echo ""
echo "Prochaines étapes :"
echo "  1. Pointe le domaine meretrouver.fr vers l'IP de ce VPS (DNS A record)"
echo "  2. Exécute deploy/deploy.sh pour déployer le site"
echo "  3. Le certificat SSL sera automatiquement configuré après le premier deploy"
echo ""
echo "IP de ce serveur :"
curl -s ifconfig.me
echo ""
