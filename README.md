# imanamini.ir — Angular Portfolio

Personal portfolio site for Iman Amini, built with Angular 21 (standalone components, lazy-loaded routes).

## Routes
| Path | Description |
|------|-------------|
| `/` | Home |
| `/resume` | Resume / CV |

## Development

```bash
npm install
npx ng serve
# → http://localhost:4200
```

## Deploy to GitHub Pages

Source code lives on the `develop` branch.  
GitHub Pages serves from the `master` branch (build output only).

```bash
./deploy.sh
```

The script:
1. Builds with `--base-href /`
2. Copies `index.html` → `404.html` (SPA routing fix for GitHub Pages)
3. Adds `CNAME` and `.nojekyll` to the output
4. Pushes the `dist/` contents to `master` via a git worktree

## Tech Stack
- Angular 21 (standalone, lazy routes)
- SCSS
- GitHub Pages (custom domain: imanamini.ir)
