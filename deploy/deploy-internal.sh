#!/usr/bin/env bash
# Build the static export and (re)start the user unit that serves it internally.
# Run as the site's user, no root: bash deploy/deploy-internal.sh
# Address, port and unit name come from deploy/local.env (gitignored); start
# from deploy/local.env.example.
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.local/share/fnm/aliases/default/bin:$PATH"

[ -f deploy/local.env ] || { echo "deploy/local.env missing: copy deploy/local.env.example and set BIND_ADDR, PORT, UNIT" >&2; exit 1; }
. deploy/local.env
: "${BIND_ADDR:?}" "${PORT:?}" "${UNIT:?}"

# The content module must name the released aello: ../aello3/VERSION after its
# release commit is pulled. A mismatch means the site is stale, so stop.
if [ -f ../aello3/VERSION ]; then
  want=$(cat ../aello3/VERSION)
  have=$(sed -n 's/^export const version = "\(.*\)";$/\1/p' src/content/aello.ts)
  [ "$want" = "$have" ] || { echo "src/content/aello.ts says $have, aello3/VERSION says $want: update the content module first" >&2; exit 1; }
fi

npm ci
npm run build

mkdir -p ~/.config/systemd/user
sed -e "s|@BIND_ADDR@|$BIND_ADDR|g" -e "s|@PORT@|$PORT|g" deploy/static-site.service > ~/.config/systemd/user/"$UNIT".service
systemctl --user daemon-reload
systemctl --user enable "$UNIT".service >/dev/null
systemctl --user restart "$UNIT".service

curl -fs --retry 5 --retry-delay 1 --retry-connrefused -o /dev/null "http://$BIND_ADDR:$PORT/" || { echo "no answer from http://$BIND_ADDR:$PORT/" >&2; exit 1; }
ss -ltn | grep -q "$BIND_ADDR:$PORT " || { echo "not bound to $BIND_ADDR:$PORT" >&2; exit 1; }
echo "aello-site live at http://$BIND_ADDR:$PORT/"
