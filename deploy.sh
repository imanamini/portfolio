#!/usr/bin/env bash
set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
DIST_DIR="$REPO_ROOT/dist/resume-app/browser"
WORKTREE_DIR="/tmp/portfolio-deploy"

echo "==> Building Angular app..."
cd "$REPO_ROOT"
npx ng build --base-href /

echo "==> Copying 404.html for SPA routing on GitHub Pages..."
cp "$DIST_DIR/index.html" "$DIST_DIR/404.html"

echo "==> Adding CNAME to build output..."
cp "$REPO_ROOT/CNAME" "$DIST_DIR/CNAME"

echo "==> Adding .nojekyll..."
touch "$DIST_DIR/.nojekyll"

echo "==> Deploying to master branch..."
rm -rf "$WORKTREE_DIR"
git worktree add "$WORKTREE_DIR" master

# Clear master and copy new build
rm -rf "$WORKTREE_DIR"/*
cp -r "$DIST_DIR"/. "$WORKTREE_DIR/"

cd "$WORKTREE_DIR"
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin master

echo "==> Cleaning up worktree..."
cd "$REPO_ROOT"
git worktree remove "$WORKTREE_DIR" --force

echo ""
echo "✓ Deployed successfully to master branch."
echo "  Site live at: https://imanamini.ir"
echo "  Resume at:    https://imanamini.ir/resume"
