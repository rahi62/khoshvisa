#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="khoshvisa-cms-admin.service"
NGINX_SNIPPET="/etc/nginx/snippets/khoshvisa-cms.conf"

sudo install -m 0644 "$REPO_ROOT/deploy/$SERVICE_NAME" "/etc/systemd/system/$SERVICE_NAME"
sudo install -m 0644 "$REPO_ROOT/deploy/nginx.cms.conf" "$NGINX_SNIPPET"
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"

cat <<EOF
CMS Admin systemd unit installed and enabled.
Nginx snippet installed at:
  $NGINX_SNIPPET

One-time Nginx step:
Add this line INSIDE the HTTPS server block for khoshvisa.ir, before the generic location / block:
  include $NGINX_SNIPPET;

Then run:
  sudo nginx -t
  sudo systemctl reload nginx

The application deployment will create /var/www/khoshvisa/cms-admin and start the service on port 3001.
EOF
