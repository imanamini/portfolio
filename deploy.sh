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
# Preserve PDF in the deploy output
[ -f "$REPO_ROOT/Iman Amini Resume.pdf" ] && cp "$REPO_ROOT/Iman Amini Resume.pdf" "$DIST_DIR/"
# .gitignore for master: ignore caches and dependencies
cat > "$DIST_DIR/.gitignore" <<'GITIGNORE'
node_modules/
.angular/
dist/
GITIGNORE

# Copy to a temp dir OUTSIDE the repo before any branch operations
TEMP=$(mktemp -d)
cp -r "$DIST_DIR"/. "$TEMP/"

echo "==> Switching to master..."
git checkout master

echo "==> Replacing master contents with new build..."
# Remove all git-tracked files on master cleanly
git rm -rf --quiet . 2>/dev/null || true
# Also clean untracked Angular cache (but keep node_modules)
rm -rf .angular 2>/dev/null || true
# Copy build output
cp -r "$TEMP"/. .
rm -rf "$TEMP"

echo "==> Committing and pushing..."
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
# Force push is correct here: master is a deploy-only branch, not a work branch
git push --force origin master

echo "==> Back to $SOURCE_BRANCH..."
git checkout "$SOURCE_BRANCH"

echo ""
echo "Done. Site: https://imanamini.ir | Resume: https://imanamini.ir/resume"
