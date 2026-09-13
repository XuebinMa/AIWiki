#!/usr/bin/env bash
# Regenerate static/img/og-cover.png from og-cover.html.
#
# Headless Chrome rather than an SVG rasteriser: the card uses CJK, a bold
# display face and radial gradients, and Chrome is the one renderer on this
# machine that has all three plus the system fonts the design assumes.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
OUT="$REPO/static/img/og-cover.png"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$CHROME" ]; then
  echo "no Chrome at: $CHROME" >&2
  echo "set CHROME=/path/to/chrome and re-run" >&2
  exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# --headless=new is required: the legacy --headless path hangs indefinitely
# here. --virtual-time-budget bounds the wait so a font that never resolves
# cannot stall the render, and the first-run/extension flags keep a throwaway
# profile from blocking on setup.
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --no-first-run \
  --no-default-browser-check \
  --disable-extensions \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --virtual-time-budget=4000 \
  --window-size=2560,1280 \
  --screenshot="$WORK/og-cover.png" \
  --user-data-dir="$WORK/profile" \
  "file://$HERE/og-cover.html" >/dev/null 2>&1 || true

if [ ! -s "$WORK/og-cover.png" ]; then
  echo "Chrome produced no image" >&2
  exit 1
fi

mv "$WORK/og-cover.png" "$OUT"
echo "wrote $OUT"
command -v sips >/dev/null && sips -g pixelWidth -g pixelHeight "$OUT" | tail -2
