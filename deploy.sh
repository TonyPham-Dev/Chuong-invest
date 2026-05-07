#!/usr/bin/env bash
set -euo pipefail

SERVER_IP="187.127.116.246"
DOMAIN="investex.vn"
APP_NAME="investex-web"
APP_DIR="/opt/investex"
HOST_PORT="3001"
CONTAINER_PORT="3000"
SSH_USER="${1:-root}"
SSH_TARGET="${SSH_USER}@${SERVER_IP}"
ARCHIVE_NAME="investex-release.tar.gz"
ENABLE_SSL="${2:-false}"

if command -v npm >/dev/null 2>&1; then
  echo "==> Building production bundle locally"
  npm run build
else
  echo "==> npm not found on local machine, skipping local build"
  echo "==> Docker build on server will validate source and build production image"
fi

echo "==> Creating source archive"
tar \
  --warning=no-file-changed \
  --exclude="./node_modules" \
  --exclude="./.next" \
  --exclude="./.git" \
  --exclude="./${ARCHIVE_NAME}" \
  -czf "${ARCHIVE_NAME}" .

echo "==> Uploading archive to ${SSH_TARGET}"
scp "${ARCHIVE_NAME}" "${SSH_TARGET}:/tmp/${ARCHIVE_NAME}"

echo "==> Bootstrapping Ubuntu 24.04 environment on remote server"
ssh "${SSH_TARGET}" bash <<'EOF'
set -euo pipefail
if [ "$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi
${SUDO} apt-get update
${SUDO} apt-get install -y ca-certificates curl gnupg lsb-release software-properties-common
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | ${SUDO} bash -
  ${SUDO} apt-get install -y nodejs
fi
${SUDO} npm install -g npm@latest
if ! command -v docker >/dev/null 2>&1; then
  ${SUDO} install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | ${SUDO} gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  ${SUDO} chmod a+r /etc/apt/keyrings/docker.gpg
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" | ${SUDO} tee /etc/apt/sources.list.d/docker.list >/dev/null
  ${SUDO} apt-get update
  ${SUDO} apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
${SUDO} apt-get install -y nginx ufw certbot python3-certbot-nginx
${SUDO} systemctl enable --now docker
${SUDO} systemctl enable --now nginx
if ! ${SUDO} ufw status | grep -q "Status: active"; then
  ${SUDO} ufw --force enable
fi
${SUDO} ufw allow OpenSSH
${SUDO} ufw allow 'Nginx Full'
${SUDO} ufw --force reload
EOF

echo "==> Deploying container on remote server"
ssh "${SSH_TARGET}" bash <<EOF
set -euo pipefail
if [ "\$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi
mkdir -p "${APP_DIR}"
tar -xzf "/tmp/${ARCHIVE_NAME}" -C "${APP_DIR}"
cd "${APP_DIR}"
\${SUDO} docker build -t "${APP_NAME}:latest" .
if \${SUDO} docker ps -a --format '{{.Names}}' | grep -q "^${APP_NAME}\$"; then
  \${SUDO} docker stop "${APP_NAME}" || true
  \${SUDO} docker rm "${APP_NAME}" || true
fi
\${SUDO} docker run -d \
  --name "${APP_NAME}" \
  --restart unless-stopped \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "${APP_NAME}:latest"
EOF

echo "==> Configuring Nginx reverse proxy for ${DOMAIN}"
ssh "${SSH_TARGET}" bash <<EOF
set -euo pipefail
if [ "\$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi
if command -v nginx >/dev/null 2>&1; then
  \${SUDO} tee /etc/nginx/sites-available/${DOMAIN} >/dev/null <<NGINXCONF
server {
  listen 80;
  server_name ${DOMAIN} www.${DOMAIN};
  client_max_body_size 20m;

  location / {
    proxy_pass http://127.0.0.1:${HOST_PORT};
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
NGINXCONF
  \${SUDO} ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
  \${SUDO} nginx -t
  \${SUDO} systemctl reload nginx
else
  echo "Nginx not found. Please install Nginx and configure reverse proxy manually."
fi
EOF

if [ "${ENABLE_SSL}" = "true" ]; then
  echo "==> Enabling SSL certificate with Certbot"
  ssh "${SSH_TARGET}" bash <<EOF
set -euo pipefail
if [ "\$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi
\${SUDO} certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m admin@${DOMAIN} --redirect
EOF
fi

rm -f "${ARCHIVE_NAME}"

echo "==> Deployment completed"
echo "Container: ${APP_NAME} running on port ${HOST_PORT}"
echo "Domain: ${DOMAIN}"
echo "To auto SSL in next deploy:"
echo "./deploy.sh ${SSH_USER} true"
