---
name: Iman Amini
role: Senior Front-End Developer
headline: **Front-end owner of Digipay's payment (checkout) product**, Digikala Group's fintech arm, after 4+ years owning its **Credit & BNPL front-end** — payment, wallet and credit flows for **10M+ users** · **Founder of XPCard**, a gaming-commerce marketplace built from scratch with AI agents · **Remote front-end work for international teams in Canada and the UK**
availability: Open to relocation · Hybrid / On-site / Remote · Fluent English
email: iman.fa88@gmail.com
phone: +98-9034646366
portfolio_url: https://imanamini.ir
portfolio_label: imanamini.ir
linkedin_url: https://www.linkedin.com/in/imanamini78
linkedin_label: linkedin.com/in/imanamini78
github_url: https://github.com/imanamini
github_label: github.com/imanamini
projects_title: International Projects
---

## Pitch

Front-end developer with 5+ years of **TypeScript, React and Angular** in consumer fintech. At Digipay I owned the entire **Credit & BNPL front-end** for 4+ years and since July 2026 I am the **front-end owner of its payment (checkout) product** — flows used by **10M+ people** — working with product managers, designers and backend teams across many microservices. I have worked remotely as the front-end developer for **international teams in Canada and the UK**, I bring a testing mindset (7,400+ automated tests in suites I built), and I founded XPCard, a marketplace I built alone with **contract-first OpenAPI** APIs. Over the last year **AI has become central to how I build**: I wrote **20 Claude Code agents, skills and slash commands** myself across Digipay and XPCard, so AI does the heavy lifting while I keep architecture and review in my hands.

## Stats

- 10M+ · users on payment flows I own
- 7,400+ · automated tests in suites I built
- 1 day → <1h · to write a full component test spec with AI
- 115 · features shipped solo in 3 months

## Experience

### Digipay | Tehran, Iran | Senior Front-End Engineer · Front-End Owner | Dec 2021 – Present
about: Payments and credit arm of **Digikala Group**, Iran's largest e-commerce company.
tags: TypeScript, Angular, Nx, RxJS, Signals, Playwright, Node.js, Claude Code
backend_label: Microservices & Backend
backend_stack: Java / Spring Boot  ·  REST

#### featured
- **Front-end owner of Digipay's payment (checkout) product since Jul 2026**; before that I owned the entire **Credit & BNPL front-end** (Dec 2021 – Jul 2026). Flows used by **10M+ people**.
- Work daily with product managers, designers and the backend teams behind many microservices, and mentor the engineers on my lines.

#### bullets
- **Checkout E2E:** a Playwright suite that pays through the real backend — 47 wallet, credit, bank-gateway and error scenarios. It caught bugs that left users stuck mid-payment and a **double-payment risk**.
- **UI library testing:** built the whole test setup and the playground demo app for Digipay's 80-package UI library — **3,150+ Playwright E2E / visual tests**, 4,200+ unit tests and 770 visual baselines.
- **Framework upgrades:** moved both front-end monorepos from **Angular 17 / Nx 18 to Angular 22 / Nx 23** — the client monorepo (17 repos, 110+ Nx projects) and the payment monorepo (~1,150 files).
- **AI agents for UI work:** wrote dev → Figma QA → design-review agents on **Figma MCP**, with a shared lessons file, so dashboard screens are built and checked against the design automatically.
- **AI in the team workflow:** wrote Claude Code commands for **AI code review** of staging and production merge requests, and for writing and fixing component tests. A full test spec went from **1 day to under 1 hour**; library regressions reaching QA dropped to **near zero**.
- **Credit onboarding:** a 7-step credit state machine with conditional step-skipping and URL-synced steps, so users can resume a half-finished application.
- **Shared code:** architected **14 shared npm packages** used across product teams, and wrote Node.js tooling (test-catalog CLI, E2E report server).

#### backend
- Ship to the Java / Spring Boot services behind the credit products: Micrometer metrics for the onboarding service, a switch between two external credit-scoring engines, and production bug fixes covered by unit tests.

#### challenge
- Merging two live payment apps into one without breaking a single URL
- Credit and Web-Pay (~840 TypeScript files) had to become one app while real payments kept flowing. I designed a layout that moved every file **without editing its source**, kept every published URL working as a route subtree, ran both versions side by side behind nginx, then cut over in production with **no user-facing regressions**.

### XPCard | Remote | Founder & Software Engineer | Jul 2026 – Present
about: Gift-card and gaming-credit marketplace I built from scratch with AI agents; **1B+ toman GMV in its first two months**.
tags: TypeScript, Angular, Nx, OpenAPI, Java 21, Spring Boot, Docker, Claude Code
backend_label: Backend & API
backend_stack: OpenAPI 3.1  ·  Java 21 / Spring Boot  ·  MySQL  ·  MongoDB  ·  Redis

#### bullets
- Built the whole product alone: storefront, admin dashboard, chat-bot sales channel and SEO content site, live within three months.
- Storefront and admin in TypeScript on Nx: standalone components, signals, domain libraries with enforced boundaries, an RTL design system, Jest and Playwright.
- Traffic comes from organic search through a content site and technical SEO I built.

#### backend
- Designed **27 OpenAPI 3.1 contracts** as the only boundary between frontend and backend, with integer minor-unit money end to end.
- Built the order and payment core: multiple payment gateways, wallet, OTP login with JWT, and automated supplier fulfillment with signed webhooks.

#### challenge
- Shipping a full product alone at team speed
- I designed a **Claude Code multi-agent pipeline** (PM → architect → dev → QA → review) with guardrails the agents cannot skip: lint, tests, build and screenshot checks on every change. It delivered **~115 features in three months**, and I still review every merge myself.

### Adowing | Tehran, Iran | Front-End Developer | Oct 2019 – Dec 2021
tags: Vue, Nuxt, JavaScript, Agile

#### bullets
- Built internal Vue panels for the marketing and accounting teams, pixel-perfect across screen sizes.
- Introduced agile practices with the product team and mentored a front-end intern.

### Carnotic | Tehran, Iran | Front-End Developer | Oct 2019 – Dec 2021
about: Online freight-forwarding platform.
tags: Nuxt, SSR, SEO

#### bullets
- Built a responsive, server-rendered Nuxt frontend chosen for SEO, with documented components and tests.

## Projects

### Origins | Ethical payments & rewards wallet | Front-End Developer | Sep 2026 – Present
international: United Kingdom · Remote
about: UK fintech building a rewards wallet and BNPL access for credit-invisible consumers.
stack: React Native, React, TypeScript
featured: true

#### bullets
- Built the marketing landing pages; now building the **React Native mobile app** for the wallet, working remotely with the UK team.

### Pita | Restaurant kiosk & kitchen display | Architect & Lead Frontend | 2024 – 2025
international: Canada · Remote
stack: React, TypeScript, Nx, WebSockets, Docker
featured: true

#### bullets
- Led the frontend for a **Canadian client**, working remotely in English with their team: a customer kiosk and a kitchen display in one React / Nx monorepo.
- Real-time order sync over WebSockets with a polling fallback, and thermal receipt printing with automatic network → USB fallback.

### RexRx | Online prescription pharmacy | Front-End Developer | 2024
international: Canada · Remote
stack: Angular 17, TypeScript, PWA, Signals
featured: true

#### bullets
- Built the front-end of a **Canadian** online pharmacy for GLP-1 weight-loss treatments: a server-driven medical questionnaire for eligibility, multi-step prescription checkout and an installable PWA.

## Toolkit

### core
TypeScript · 5y, JavaScript · 6y, React / Next.js · 4y, Angular · 5y

### proficient
Node.js, Nx Monorepo, RxJS, Vue / Nuxt, Playwright, Jest, SCSS / Tailwind, PWA, SSR & SEO

### backend
REST / OpenAPI, Microservices, Java / Spring Boot, MySQL, MongoDB, Redis, Docker

### ai
Claude Code, multi-agent workflows, MCP (Figma), AI code review, AI test generation, project rules & slash commands

### familiar
React Native, GitHub Actions, Google Tag Manager, Sentry, Figma, Agile / Scrum

## Education

### Islamic Azad University, Central Tehran Branch | Tehran | B.Sc. Computer Engineering | 2017 – 2022

## Languages

- English | Fluent
- Persian | Native

## Courses

- Claude Code in Action | Anthropic | 2026
- The Complete Guide to Becoming a Software Architect | Udemy | 2025
- Angular — The Complete Guide | Udemy | 2024
- Test Automation Foundations | LinkedIn
- Agile Software Development: Clean Coding Practices | LinkedIn
- Agile Software Development: Refactoring | LinkedIn
