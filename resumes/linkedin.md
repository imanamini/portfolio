# LinkedIn profile — copy-paste source (synced with `resumes/ats-frontend.md`, 2026-10-13)

Applied to the live profile on 2026-10-13 via Claude in Chrome (headline, About, both Digipay positions, Awan Holding, XPCard / Pita / RexRx projects, skills).

Rules: same facts, numbers and titles as the resume. The headline carries the full-stack positioning;
each position keeps its official title. No target company names anywhere.

---

## Headline (≤ 220 chars)

```
Senior Full-Stack Engineer (Front-End Focused) · Angular · TypeScript · React · Java / Spring Boot · Fintech · Front-end owner of Digipay's payment product (10M+ users) · Founder of XPCard
```

(203 characters)

## Location
Tehran, Iran

## Open to work (recruiter settings)
- Job titles: Senior Full-Stack Engineer · Senior Front-End Engineer · Senior Software Engineer · Full-Stack Developer · Front-End Developer · Angular Developer
- Location types: Remote · Hybrid · On-site
- Locations: Remote; plus the countries you are targeting for relocation (add them one by one — Germany, Netherlands, Sweden, UK, Canada, etc.)
- Start date: flexible
- Job types: Full-time

## About (≤ 2,600 chars)

```
Senior full-stack engineer with a front-end core: 6+ years of building and owning production web applications in TypeScript, Angular and React, plus Java / Spring Boot services in production.

At Digipay (the payments and credit arm of Digikala Group, Iran's largest e-commerce company) I have owned the Credit & BNPL front-end for four years and now own the front-end of its payment (checkout) product — flows used by 10M+ people. I set the technical direction, review every merge request, mentor the engineers on my lines, and ship to the Java microservices behind the credit products.

What I have built there:
• The Credit & BNPL applet libraries (~1,000 TypeScript files, ~400 components) — one abstracted codebase serving both product lines
• Pillar, Digipay's mini-app inside the Digikala super-app (PWA)
• A merge of two live payment apps (~840 files) into one with zero broken URLs and no user-facing regressions
• The whole test setup for an 80-package Angular UI library: 3,150+ Playwright E2E / visual tests, 4,200+ unit tests, 770 visual baselines — 7,400+ automated tests in suites I built
• Both front-end monorepos upgraded from Angular 17 / Nx 18 to Angular 22 / Nx 23
• ~20 Claude Code agents and commands (AI code review of merge requests, Figma-MCP design-review agents, test-writing commands) — a full component test spec went from 1 day to under 1 hour

Alongside my job I founded XPCard, a gift-card and gaming-credit marketplace, and built the whole stack myself: Java 21 / Spring Boot modular monolith, MySQL / MongoDB / Redis, 27 contract-first OpenAPI specs, Angular / Nx storefront and admin, Docker production with GitHub Actions — live in three months, 250+ paid orders in the first two. I have also delivered part-time remote front-end contracts for Canadian teams (React kiosk / kitchen-display system; Angular pharmacy PWA).

I am looking for a full-time senior full-stack or front-end role in an international team — relocation or remote.

Stack: TypeScript · JavaScript · Angular · React · Vue / Nuxt · RxJS · Signals · Nx Monorepo · HTML5 · CSS3 / SCSS / Tailwind · PWA · SSR & SEO · Playwright · Jest · Karma / Jasmine · Java 21 · Spring Boot 3 · JPA / Hibernate · MySQL · MongoDB · Redis · REST / OpenAPI · Docker · nginx · Git · GitLab CI · GitHub Actions · Sentry · Claude Code / MCP

📧 iman.fa88@gmail.com · 🌐 imanamini.ir · GitHub: github.com/imanamini
```

---

## Experience

### 1. Digipay (Digikala Group)
- **Title:** Senior Front-End Engineer
- **Employment type:** Full-time
- **Dates:** Dec 2021 – Present
- **Location:** Tehran, Iran · On-site / Hybrid
- **Skills (pick up to 5 to pin):** Angular, TypeScript, Nx, Playwright, Spring Boot

Description:
```
Payments and credit arm of Digikala Group, Iran's largest e-commerce company; 10M+ users.

Front-end owner of the payment (checkout) product since Jul 2026; owned the entire Credit & BNPL front-end from Dec 2021 to Jul 2026. Set the technical direction, review every merge request and mentor the engineers on these lines.

• client-monorepo (17 repos, 110+ Nx projects): built and own the Credit & BNPL applet libraries (~1,000 TypeScript files, ~400 components) loaded by the main consumer app and the installments app through a credit shell — onboarding, pre-registration and campaign flows, smart scoring, wallet activation, wallet and transaction details, payment callbacks, installments overview and contract settlement. One abstracted codebase serving both the Credit and BNPL product lines.
• client-monorepo: built the 7-step credit onboarding flow as a state machine with conditional step-skipping, dynamic plan filtering and URL-synced steps, so users can resume a half-finished application.
• client-monorepo (pillar app): built Pillar, Digipay's mini-app inside the Digikala super-app — Digikala SSO, wallet and cash-in, transactions, card, installments and credit services as lazy-loaded applets behind a thin shell, as an installable PWA with a metadata-driven preloading strategy for critical routes.
• limbo-monorepo (payment / checkout, ~1,150 files): migrated the standalone web-wallet, credit and merchant-credit Angular apps into one Nx monorepo with shared libraries, then merged the Credit and Web-Pay apps (~840 TypeScript files) into one purchase app while real payments kept flowing — every published URL kept working as a route subtree, both versions ran side by side behind nginx, and the cut-over shipped with no user-facing regressions.
• limbo-monorepo: built a Playwright E2E suite that pays through the real UAT backend (47 wallet, credit, bank-gateway and error-recovery scenarios); it found 11 app bugs, 7 of which left users stuck mid-payment, and surfaced a double-payment risk on the backend.
• digipay-libs-workspace (80-package Angular UI library): architected and published 14 of its shared npm packages used across product teams, and built the whole test setup and playground demo app — 3,150+ Playwright E2E / visual tests, 4,200+ Karma / Jasmine unit tests and 770 visual baselines guarding backward compatibility.
• Upgraded both front-end monorepos from Angular 17 / Nx 18 to Angular 22 / Nx 23 (TypeScript 6, ESLint 9): standalone components, built-in control flow, signal inputs / outputs and OnPush everywhere, with E2E runs after every step.
• Introduced AI-assisted engineering to the team with ~20 Claude Code agents and commands I wrote: AI review of staging and production merge requests, Figma-MCP dev → QA → design-review agents, and test-writing commands that cut a full component test spec from 1 day to under 1 hour, with library regressions reaching QA near zero.
• Backend (Java / Spring Boot microservices): instrumented the credit-onboarding service end to end with Micrometer metrics, built a configurable time-window switch between two external credit-scoring engines, and fixed production bugs (NPE in blocking-detail, journal double-linking, BNPL SMS double-activation), each covered by unit tests.

Technologies: Angular 17–22, TypeScript, RxJS, Signals, Nx Monorepo, PWA, SCSS, Playwright, Karma / Jasmine, Node.js, Git / GitLab CI, Sentry, Java / Spring Boot, Claude Code
```

### 2. Awan Holding (company page: linkedin.com/company/89989141)
- **Title:** Front-End Developer
- **Employment type:** Full-time
- **Dates:** Oct 2019 – Dec 2021
- **Location:** Tehran, Iran · On-site
- **Skills:** Vue.js, Nuxt.js, JavaScript, SEO, Agile
- The older Awan Holding roles (UI Designer Apr–Oct 2019, Social Media Specialist, Junior Advertising Operator) stay on LinkedIn under the same company page; they are not on the resume.

Description:
```
Holding company behind Adowing (internal business panels) and Carnotic (online freight-forwarding platform).

• Carnotic: built the responsive, server-side-rendered Nuxt front-end of a freight-forwarding platform, chosen for SEO; documented the components and wrote unit tests for all methods.
• Adowing: developed internal Vue panels for the marketing and accounting departments, pixel-perfect from the Figma designs; built a reusable video player for the Talent Academy platform and a global SSO login for internal platforms.
• Introduced agile practices and unit / regression testing, and mentored a front-end intern.

Technologies: Vue, Nuxt, JavaScript, HTML5, CSS3 / SCSS, SSR, SEO, Jest, Git, Agile / Scrum
```

> Digipay on LinkedIn is two positions (Front-End Developer Dec 2021 – Aug 2024, Senior Front-End Engineer Aug 2024 – Present) — a real promotion split; the resume shows one entry.

> Do NOT add XPCard, Pita or RexRx as positions — they are part-time and would show as three concurrent jobs. They go in **Projects** below. (If you want XPCard visible in the Experience timeline anyway, add it as *Self-employed · Part-time* with the same text as the project.)

---

## Projects (Add profile section → Projects)

### XPCard — gift-card & gaming-credit marketplace (giftcard platform)
- **Dates:** Jul 2026 – Present · **Associated with:** none (self-employed, side project, part-time)
- **Link:** https://xpcard.ir
```
Founder & sole engineer. Gift-card and gaming-credit marketplace built from scratch alongside my full-time job; live in three months, 250+ paid orders in the first two.

• Front-end: storefront and admin apps on Nx with standalone components, signals, feature / ui / data-access libraries with enforced boundaries, an RTL design system, Jest unit tests and Playwright E2E.
• Backend: Java 21 / Spring Boot modular monolith (catalog, order, payment, wallet, auth, supplier), 27 contract-first OpenAPI 3.1 specs, multiple payment gateways, OTP + JWT auth, automated supplier fulfilment with signed webhooks, ~1,000 Mockito / Testcontainers tests.
• Delivery: designed a Claude Code multi-agent pipeline (PM → architect → dev → QA → review) with guardrails on every change (lint, tests, build, screenshot checks); ~115 features shipped in three months with my review on every merge; Dockerised production on a VPS with GitHub Actions deploys.

Technologies: Angular 20, TypeScript, Nx, Jest, Playwright, OpenAPI 3.1, Java 21, Spring Boot 3, MySQL, MongoDB, Redis, Docker, GitHub Actions, Claude Code
```

### Pita — restaurant kiosk & kitchen display system
- **Dates:** Dec 2025 – Feb 2026 · remote contract (Canada), part-time
```
Sole front-end developer for a Canadian restaurant client, working remotely in English with their team — the whole front-end was mine.

• Architected an Nx monorepo with two React apps (customer kiosk and kitchen display) sharing API and UI libraries, deployed as separate Docker images behind nginx.
• Real-time order sync between kiosk and kitchen over WebSockets with a polling fallback; thermal receipt printing with automatic network → USB fallback; a version checker that reloads always-on kiosks when a new build ships.

Technologies: React, TypeScript, Nx Monorepo, WebSockets (Laravel Echo / Pusher), Epson ePOS SDK, Docker, nginx
```

### RexRx — online prescription pharmacy PWA
- **Dates:** Dec 2025 – Mar 2026 · remote contract (Canada), part-time
```
Front-End Developer. Built the installable Angular PWA of a Canadian online pharmacy for GLP-1 treatments: a server-driven adaptive medical questionnaire for eligibility screening, signal-based session management, CAPTCHA-protected auth and a multi-step prescription checkout.

Technologies: Angular 17, TypeScript, Signals, PWA / Service Worker, SCSS
```

---

## Education
- **School:** Islamic Azad University, Central Tehran Branch
- **Degree:** Bachelor of Science (B.Sc.) · Computer Engineering
- **Dates:** 2017 – 2022

## Licenses & certifications / Courses
- Claude Code in Action — Anthropic, 2026
- The Complete Guide to Becoming a Software Architect — Udemy, 2025
- Angular — The Complete Guide — Udemy, 2024
- UTACM-Cafebazaar Android Course — University of Tehran, 2019
- LinkedIn Learning: Agile Software Development: Clean Coding Practices & Refactoring · Test Automation Foundations · Agile Testing · JavaScript: Classes · Interactive Animations with CSS and JavaScript · Bootstrap 4 with Sass · JavaScript for Web Designers

## Languages
- English — Full professional proficiency
- Persian — Native or bilingual proficiency

## Skills (add in this order; LinkedIn weights the top 3 pinned and the first ~20 most)

Pinned (top 3): **TypeScript · Angular · Java / Spring Boot**

Then: JavaScript, React, Front-End Development, Full-Stack Development, Nx (Monorepo), RxJS, HTML5, CSS / SCSS, Tailwind CSS, Progressive Web Apps (PWA), Server-Side Rendering (SSR), SEO, Playwright, Jest, Karma / Jasmine, Test Automation, REST APIs, OpenAPI, Microservices, Spring Boot, Java, JPA / Hibernate, MySQL, MongoDB, Redis, Docker, nginx, Git, GitLab CI, GitHub Actions, CI/CD, Sentry, Vue.js, Nuxt.js, Node.js, Figma, Agile / Scrum, Code Review, Mentoring, Claude Code, AI-Assisted Development, MCP, Fintech, Payments, BNPL

## Featured section
- Website: imanamini.ir
- PDF: the resume (`public/Iman Amini Resume.pdf`)
- Link: XPCard (xpcard.ir)

## Custom URL
linkedin.com/in/imanamini78 (already set — keep it; it is printed on the resume)
