#!/usr/bin/env bash
# Save a browsable static copy of any version of the site into docs/designs/<name>/.
#
# Usage: scripts/snapshot.sh <name> [git-ref]
#   scripts/snapshot.sh v2 bbd2d87
#   scripts/snapshot.sh v3 v3-work-led
#
# The build happens in a temporary git worktree, so your working copy is never touched.
# The inquiry API, share image, sitemap and robots.txt are removed from the copy (a static
# archive cannot run a server), so the form in a snapshot falls back to "send by email".
# View the result with: npx serve docs   then open /designs/
set -euo pipefail

name="${1:?usage: scripts/snapshot.sh <name> [git-ref]}"
ref="${2:-HEAD}"
root="$(git rev-parse --show-toplevel)"
work="$(mktemp -d)/src"

cleanup() { git -C "$root" worktree remove --force "$work" >/dev/null 2>&1 || true; }
trap cleanup EXIT

git -C "$root" worktree add --detach "$work" "$ref" >/dev/null
cd "$work"

# Server-only routes and SEO files have no place in a static archive.
rm -rf app/api app/opengraph-image.* app/sitemap.ts app/robots.ts docs

# Static export cannot run with Cache Components, so drop "use cache" from this copy only.
grep -rl '"use cache"' app components 2>/dev/null | xargs -r sed -i '/"use cache";/d'
mv next.config.ts next.config.base.ts
cat > next.config.ts <<EOF
import type { NextConfig } from "next";
import base from "./next.config.base";

// Static export served from /designs/$name/ so every snapshot can sit side by side.
const config: NextConfig = {
  ...base,
  cacheComponents: false,
  partialPrefetching: false,
  output: "export",
  basePath: "/designs/$name",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
EOF

npm ci --prefer-offline --no-audit --no-fund --loglevel=error
npx next build >/dev/null

rm -rf "$root/docs/designs/$name"
mkdir -p "$root/docs/designs"
cp -r out "$root/docs/designs/$name"
echo "Saved $ref to docs/designs/$name"
