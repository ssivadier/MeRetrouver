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
echo "[1/10] Mise à jour du système..."
apt-get update -qq
apt-get upgrade -y -qq

# ── 2. Utilisateur deploy ───────────────────────────────────────────────────
echo "[2/10] Création de l'utilisateur deploy..."
if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  usermod -aG sudo "$DEPLOY_USER"
fi

# ── 3. SSH durci ────────────────────────────────────────────────────────────
echo "[3/10] Durcissement de la configuration SSH..."
SSHD_CONFIG="/etc/ssh/sshd_config"
cp "$SSHD_CONFIG" "$SSHD_CONFIG.bak"
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' "$SSHD_CONFIG"
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' "$SSHD_CONFIG"
sed -i 's/^#\?MaxAuthTries.*/MaxAuthTries 3/' "$SSHD_CONFIG"
sed -i 's/^#\?LoginGraceTime.*/LoginGraceTime 30/' "$SSHD_CONFIG"
systemctl restart sshd

# ── 4. Fail2ban ─────────────────────────────────────────────────────────────
echo "[4/10] Installation de Fail2ban..."
apt-get install -y -qq fail2ban
cat > /etc/fail2ban/jail.local <<'FAIL2BAN'
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
FAIL2BAN
systemctl enable fail2ban
systemctl restart fail2ban

# ── 5. Mises à jour automatiques ────────────────────────────────────────────
echo "[5/10] Configuration des mises à jour automatiques..."
apt-get install -y -qq unattended-upgrades
cat > /etc/apt/apt.conf.d/20auto-upgrades <<'UPGRADES'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
UPGRADES

# ── 6. Node.js via NVM ─────────────────────────────────────────────────────
echo "[6/10] Installation de Node.js $NODE_VERSION..."
if ! su - "$DEPLOY_USER" -c "command -v nvm" &>/dev/null; then
  su - "$DEPLOY_USER" -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash"
fi
su - "$DEPLOY_USER" -c "nvm install $NODE_VERSION"
su - "$DEPLOY_USER" -c "nvm use $NODE_VERSION"
su - "$DEPLOY_USER" -c "nvm alias default $NODE_VERSION"

# ── 7. PM2 ──────────────────────────────────────────────────────────────────
echo "[7/10] Installation de PM2..."
su - "$DEPLOY_USER" -c "npm install -g pm2"
su - "$DEPLOY_USER" -c "pm2 startup systemd -u $DEPLOY_USER --hp /home/$DEPLOY_USER" | tail -1

# ── 8. Nginx ────────────────────────────────────────────────────────────────
echo "[8/10] Installation de Nginx..."
apt-get install -y -qq nginx
systemctl enable nginx
systemctl start nginx

# ── 9. Certbot (Let's Encrypt) ──────────────────────────────────────────────
echo "[9/10] Installation de Certbot..."
apt-get install -y -qq certbot python3-certbot-nginx

# ── 10. Firewall ────────────────────────────────────────────────────────────
echo "[10/10] Configuration du firewall..."
if command -v ufw &>/dev/null; then
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw --force enable
fi

# ── Dossier de l'application ────────────────────────────────────────────────
echo "Préparation du dossier /opt/me-retrouver..."
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
