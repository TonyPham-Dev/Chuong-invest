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

echo "==> Building production bundle locally"
npm run build

echo "==> Creating source archive"
tar \
  --exclude="./node_modules" \
  --exclude="./.next" \
  --exclude="./.git" \
  --exclude="./${ARCHIVE_NAME}" \
  -czf "${ARCHIVE_NAME}" .

echo "==> Uploading archive to ${SSH_TARGET}"
scp "${ARCHIVE_NAME}" "${SSH_TARGET}:/tmp/${ARCHIVE_NAME}"

echo "==> Deploying container on remote server"
ssh "${SSH_TARGET}" bash <<EOF
set -euo pipefail
mkdir -p "${APP_DIR}"
tar -xzf "/tmp/${ARCHIVE_NAME}" -C "${APP_DIR}"
cd "${APP_DIR}"
docker build -t "${APP_NAME}:latest" .
if docker ps -a --format '{{.Names}}' | grep -q "^${APP_NAME}\$"; then
  docker stop "${APP_NAME}" || true
  docker rm "${APP_NAME}" || true
fi
docker run -d \
  --name "${APP_NAME}" \
  --restart unless-stopped \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "${APP_NAME}:latest"
EOF

echo "==> Configuring Nginx reverse proxy for ${DOMAIN}"
ssh "${SSH_TARGET}" bash <<EOF
set -euo pipefail
if command -v nginx >/dev/null 2>&1; then
  cat > /etc/nginx/sites-available/${DOMAIN} <<NGINXCONF
server {
  listen 80;
  server_name ${DOMAIN} www.${DOMAIN};

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
  ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
  nginx -t
  systemctl reload nginx
else
  echo "Nginx not found. Please install Nginx and configure reverse proxy manually."
fi
EOF

rm -f "${ARCHIVE_NAME}"

echo "==> Deployment completed"
echo "Container: ${APP_NAME} running on port ${HOST_PORT}"
echo "Domain: ${DOMAIN}"
echo "Run SSL command on server if needed:"
echo "certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
