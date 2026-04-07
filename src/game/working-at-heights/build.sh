#!/bin/bash
# =============================================
# Working at Heights — Build Script
# Bundles the game into a standalone HTML file
# =============================================

set -e

GAME_DIR="src/game/working-at-heights"
OUT_DIR="public/games/working-at-heights"

echo "Building Working at Heights..."

# Create output directory
mkdir -p "$OUT_DIR"

# Bundle TypeScript into single JS file (IIFE format)
npx esbuild "$GAME_DIR/standalone-entry.ts" \
  --bundle \
  --outfile="$OUT_DIR/game.js" \
  --format=iife \
  --target=es2020 \
  --minify \
  --sourcemap

# Copy standalone HTML
cp "$GAME_DIR/standalone.html" "$OUT_DIR/index.html"

# Replace module script with bundled script reference
sed -i 's|<script type="module">.*</script>|<script src="game.js"></script>|g' "$OUT_DIR/index.html"

# Copy assets if they exist
if [ -d "$GAME_DIR/assets/sprites" ] && [ "$(ls -A "$GAME_DIR/assets/sprites" 2>/dev/null)" ]; then
  mkdir -p "$OUT_DIR/assets/sprites"
  cp -r "$GAME_DIR/assets/sprites/"* "$OUT_DIR/assets/sprites/"
fi

if [ -d "$GAME_DIR/assets/backgrounds" ] && [ "$(ls -A "$GAME_DIR/assets/backgrounds" 2>/dev/null)" ]; then
  mkdir -p "$OUT_DIR/assets/backgrounds"
  cp -r "$GAME_DIR/assets/backgrounds/"* "$OUT_DIR/assets/backgrounds/"
fi

echo "Build complete: $OUT_DIR/index.html"
echo "Embed via: <iframe src=\"/games/working-at-heights/index.html\" />"
