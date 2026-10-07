# Resume variants

`RESUME.md` (repo root) is the full resume: it feeds the website and `public/Iman Amini Resume.pdf`.
This folder holds shorter, role-focused variants that reuse the same PDF generator.

| File | Use for |
|---|---|
| `frontend-developer.md` | Front-end / JavaScript / React roles at product companies (3 pages). First built for the 2026-10 application in `applications/` |

Build a variant:

```bash
RESUME_MD=resumes/frontend-developer.md RESUME_PDF="resumes/out/Iman Amini Resume.pdf" node scripts/generate-pdf.mjs
```

## Folder layout

```
resumes/
  README.md                 rules + verified facts (tracked)
  frontend-developer.md     living source of the front-end variant (tracked)
  out/                      scratch PDFs (git-ignored)
  applications/             one folder per application (git-ignored)
    <yyyy-mm>-<company>-<position>/
      README.md             company, position, link, status, ad → resume mapping, gaps, decisions, feedback
      job-posting.md        full text of the ad on the day we prepared it
      resume.md             frozen copy of the exact source sent
      Iman Amini Resume.pdf the exact PDF sent
```

`applications/` is git-ignored because this repo is public: company names of applications never go into tracked
files. Back it up elsewhere if it matters. For a new application, copy the folder pattern, freeze `resume.md`
from the variant you used, and fill in the README.

## Rules for every variant

Content
- Never name the target company and keep the neutral title "Senior Front-End Developer".
  The PDF file name stays `Iman Amini Resume.pdf`.
- 2–3 pages (the experience is long). Never cut courses or details just to hit a page count, and don't cram
  several topics into one bullet: one topic per bullet, 1–2 lines, outcome first, with a number.
- Every role ends with one **Most important challenge** (`#### challenge`: first line = title, second = constraint → action → result).
- A one-line `about:` under every company — recruiters abroad don't know Digipay or XPCard.
- International work is always visible: `international:` pill, plus a mention in the headline and the summary.
- Every block has a section title (Summary, Experience, Projects, Skills, Education, Languages, Courses).
- Only claim skills with real evidence; list gaps against the job ad in the application note instead.

Design (scripts/generate-pdf.mjs)
- Job title is bigger and bolder than the company name.
- Section boundaries must be obvious: tinted heading band with a coloured underline, 18px between sections,
  dashed divider between entries.
- `projects_title:` in the frontmatter renames the Projects section (the front-end variant uses "International Projects").
- Colours rotate between neighbouring blocks (teal / indigo / amber / rose / sky) so the page doesn't read as one flat
  "lecture notes" tone; body text stays dark on white.
- Single column, real text (ATS-safe): no icons, skill bars or images.
- `**bold**` in the markdown renders bold in the PDF and is stripped for the website.

## Reusable facts (verified 2026-10)
- AI (all agents / skills / commands written by Iman — ~20 total): digipay-libs-workspace 7 Claude commands (write/fix package
  tests, build demos, changelogs); smart-dashboard 3 agents (dev → Figma QA → design review, Figma MCP, shared LESSONS.md);
  client-monorepo AI MR-review commands for staging/master; XPCard PM / architect / dev / QA / reviewer / SEO / content agents.
  Libs AI report (public/decks/digipay-libs/cto-ai-report.pdf): full test spec 1 day → <1h, near-zero lib regressions reaching QA.
- Toolkit supports an optional `### ai` row.
- Digipay role: owned the entire Credit & BNPL front-end Dec 2021 – Jul 2026; front-end owner of Digipay's payment (purchase / checkout) product since Jul 2026 — NOT all of Digipay (it has many other lines).
- Both front-end monorepos upgraded Angular 17 / Nx 18 → Angular 22 / Nx 23: client-monorepo (17 repos, 110+ Nx projects)
  and limbo-monorepo (~1,150 files).
- Digipay checkout (`limbo-monorepo`): merged Credit + Web-Pay (~840 TS files) into one `purchase` app, live; 83 Playwright
  tests / 47 scenarios against real UAT; Angular 17 / Nx 18 → Angular 22 / Nx 23 upgrade.
- Digipay UI libraries (`digipay-libs-workspace`): 80+ packages, demo playground app, ~3,150 Playwright tests,
  ~4,240 unit tests, 770 visual baselines — the whole test setup was built by Iman.
- XPCard: 27 OpenAPI contracts, ~115 features in 3 months, 1B+ toman GMV in the first two months.
- International, remote, front-end only: Pita and RexRx/"Pharma" (Canada — GLP-1 online pharmacy, pharma-eta-ruby.vercel.app), Origins (UK, meetorigins.com — landing pages + React Native app, in progress).
