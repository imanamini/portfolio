#!/usr/bin/env bash
set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
DIST_DIR="$REPO_ROOT/dist/resume-app/browser"
SOURCE_BRANCH="$(git symbolic-ref --short HEAD)"

echo "==> Building..."
cd "$REPO_ROOT"
npx ng build --base-href /

echo "==> Preparing artifacts..."
cp "$DIST_DIR/index.html" "$DIST_DIR/404.html"
cp "$REPO_ROOT/CNAME" "$DIST_DIR/CNAME"
touch "$DIST_DIR/.nojekyll"
# Add a .gitignore so node_modules is ignored on master too
echo "node_modules/" > "$DIST_DIR/.gitignore"

# Copy dist to a temp dir outside the repo (safe from any git operation)
TEMP=$(mktemp -d)
cp -r "$DIST_DIR"/. "$TEMP/"

echo "==> Switching to master..."
git checkout master

echo "==> Replacing master contents with new build..."
# Remove only git-tracked files (leaves node_modules and other ignored dirs untouched)
git rm -rf --quiet . 2>/dev/null || true
cp -r "$TEMP"/. .
rm -rf "$TEMP"

echo "==> Committing and pushing..."
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin master

echo "==> Back to $SOURCE_BRANCH..."
git checkout "$SOURCE_BRANCH"

echo ""
echo "Done. Site: https://imanamini.ir | Resume: https://imanamini.ir/resume"
