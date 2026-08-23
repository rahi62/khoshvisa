#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="khoshvisa-cms-admin.service"
NGINX_SNIPPET="/etc/nginx/snippets/khoshvisa-cms.conf"
SHARED_ROOT="/var/www/khoshvisa/shared"

node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major < 20 || (major === 20 && minor < 9)) { console.error(`Node ${process.versions.node} is too old; Node >=20.9 is required.`); process.exit(1); }'
command -v /usr/bin/npm >/dev/null

sudo install -d -o deploy -g www-data -m 2775 "$SHARED_ROOT"
sudo install -m 0644 "$REPO_ROOT/deploy/$SERVICE_NAME" "/etc/systemd/system/$SERVICE_NAME"
sudo install -d -m 0755 /etc/nginx/snippets
sudo install -m 0644 "$REPO_ROOT/deploy/nginx.cms.conf" "$NGINX_SNIPPET"
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"

cat <<EOF
CMS Admin systemd unit installed and enabled.
Runtime directory:
  $SHARED_ROOT/cms-admin

Nginx snippet installed at:
  $NGINX_SNIPPET

Do NOT start the service until the first CMS Admin build has been deployed.

One-time Nginx step after the Admin service is healthy:
Add this line INSIDE the HTTPS server block for khoshvisa.ir, before the generic location / block:
  include $NGINX_SNIPPET;

Then run:
  sudo nginx -t
  sudo systemctl reload nginx
EOF
