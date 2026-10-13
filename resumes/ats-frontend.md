---
name: Iman Amini
role: Senior Full-Stack Engineer (Front-End Focused)
subtitle: Angular · TypeScript · React · Java / Spring Boot · 6+ years in fintech and e-commerce
location: Tehran, Iran
availability: Open to full-time roles · Relocation or remote · Fluent English
email: iman.fa88@gmail.com
phone: +98 903 464 6366
portfolio_url: https://imanamini.ir
portfolio_label: imanamini.ir
linkedin_url: https://www.linkedin.com/in/imanamini78
linkedin_label: linkedin.com/in/imanamini78
github_url: https://github.com/imanamini
github_label: github.com/imanamini
projects_title: Selected Projects
---

## Pitch

Senior full-stack engineer with a front-end core: 6+ years of building and owning production web applications in TypeScript, Angular and React, plus Java / Spring Boot services in production. At Digipay (Digikala Group's fintech arm) I have owned the Credit & BNPL front-end for four years, now own the front-end of its payment (checkout) product used by 10M+ people, and ship to its Java microservices. I build with a strong testing culture (7,400+ automated tests in suites I set up), lead framework migrations and monorepo architecture, and work daily with product, design and backend teams. Alongside my job I delivered remote front-end contracts for Canadian teams and founded XPCard, where I built the whole stack myself: Spring Boot backend, MySQL / MongoDB / Redis, Angular apps and Docker production. Looking for a full-time senior full-stack or front-end role in an international team.

## Experience

### Digipay (Digikala Group) | Tehran, Iran | Senior Front-End Engineer | Dec 2021 – Present
about: Payments and credit arm of Digikala Group, Iran's largest e-commerce company; 10M+ users.
tags: Angular 17–22, TypeScript, RxJS, Signals, Nx Monorepo, PWA, SCSS, Playwright, Karma / Jasmine, Node.js, Git / GitLab CI, Sentry, Java / Spring Boot, Claude Code

#### featured
- Front-end owner of the payment (checkout) product since Jul 2026; owned the entire Credit & BNPL front-end from Dec 2021 to Jul 2026. Set the technical direction, review every merge request and mentor the engineers on these lines.

#### bullets
- **client-monorepo (17 repos, 110+ Nx projects):** built and own the Credit & BNPL applet libraries (~1,000 TypeScript files, ~400 components) that the main consumer app and the installments app load through a credit shell: onboarding, pre-registration and campaign flows, smart scoring, wallet activation, wallet and transaction details, payment callbacks, installments overview and contract settlement — one abstracted codebase serving both the Credit and BNPL product lines.
- **client-monorepo:** built the 7-step credit onboarding flow as a state machine with conditional step-skipping, dynamic plan filtering and URL-synced steps, so users can resume a half-finished application.
- **client-monorepo (pillar app):** built Pillar, Digipay's mini-app inside the Digikala super-app (Iran's largest e-commerce app): Digikala SSO, wallet and cash-in, transactions, card, installments and credit services as lazy-loaded applets behind a thin shell, as an installable PWA with a metadata-driven preloading strategy for critical routes.
- **limbo-monorepo (payment / checkout, ~1,150 files):** migrated the standalone web-wallet, credit and merchant-credit Angular apps into one Nx monorepo with shared libraries, then merged the Credit and Web-Pay apps (~840 TypeScript files) into one purchase app while real payments kept flowing: every published URL kept working as a route subtree, both versions ran side by side behind nginx, and the cut-over shipped with no user-facing regressions.
- **limbo-monorepo:** built a Playwright E2E suite that pays through the real UAT backend (47 wallet, credit, bank-gateway and error-recovery scenarios); it found 11 app bugs, 7 of which left users stuck mid-payment, and surfaced a double-payment risk on the backend.
- **digipay-libs-workspace (80-package Angular UI library):** architected and published 14 of its shared npm packages used across product teams, and built the whole test setup and playground demo app: 3,150+ Playwright E2E / visual tests, 4,200+ Karma / Jasmine unit tests and 770 visual baselines guarding backward compatibility.
- Upgraded both front-end monorepos from Angular 17 / Nx 18 to Angular 22 / Nx 23 (TypeScript 6, ESLint 9): standalone components, built-in control flow, signal inputs / outputs and OnPush everywhere, with E2E runs after every step.
- Introduced AI-assisted engineering to the team with ~20 Claude Code agents and commands I wrote: AI review of staging and production merge requests, Figma-MCP dev → QA → design-review agents, and test-writing commands that cut a full component test spec from 1 day to under 1 hour, with library regressions reaching QA near zero.
- **Backend (Java / Spring Boot microservices):** instrumented the credit-onboarding service end to end with Micrometer metrics, built a configurable time-window switch between two external credit-scoring engines, and fixed production bugs (NPE in blocking-detail, journal double-linking, BNPL SMS double-activation), each covered by unit tests.

### Awan Holding (Adowing · Carnotic) | Tehran, Iran | Front-End Developer | Oct 2019 – Dec 2021
about: Holding company behind Adowing (internal business panels) and Carnotic (online freight-forwarding platform).
tags: Vue, Nuxt, JavaScript, HTML5, CSS3 / SCSS, SSR, SEO, Jest, Git, Agile / Scrum

#### bullets
- **Carnotic:** built the responsive, server-side-rendered Nuxt front-end of a freight-forwarding platform, chosen for SEO; documented the components and wrote unit tests for all methods.
- **Adowing:** developed internal Vue panels for the marketing and accounting departments, pixel-perfect from the Figma designs; built a reusable video player for the Talent Academy platform and a global SSO login for internal platforms.
- Introduced agile practices and unit / regression testing, and mentored a front-end intern.

## Projects

### XPCard | Gift-card & gaming-credit marketplace (giftcard platform) | Founder & Sole Engineer · side project, part-time | Jul 2026 – Present
about: Gift-card and gaming-credit marketplace built from scratch alongside my full-time job; live in three months, 250+ paid orders in the first two.
stack: Angular 20, TypeScript, Nx, Jest, Playwright, OpenAPI 3.1, Java 21, Spring Boot 3, MySQL, MongoDB, Redis, Docker, GitHub Actions, Claude Code

#### bullets
- Front-end: storefront and admin apps on Nx with standalone components, signals, feature / ui / data-access libraries with enforced boundaries, an RTL design system, Jest unit tests and Playwright E2E.
- Backend: Java 21 / Spring Boot modular monolith (catalog, order, payment, wallet, auth, supplier), 27 contract-first OpenAPI 3.1 specs, multiple payment gateways, OTP + JWT auth, automated supplier fulfilment with signed webhooks, ~1,000 Mockito / Testcontainers tests.
- Delivery: designed a Claude Code multi-agent pipeline (PM → architect → dev → QA → review) with guardrails on every change (lint, tests, build, screenshot checks); ~115 features shipped in three months with my review on every merge; Dockerised production on a VPS with GitHub Actions deploys.

### Pita | Restaurant kiosk & kitchen display system | Sole Front-End Developer · remote contract (Canada), part-time | Dec 2025 – Feb 2026
stack: React, TypeScript, Nx Monorepo, WebSockets (Laravel Echo / Pusher), Epson ePOS SDK, Docker, nginx

#### bullets
- Built the entire front-end for a Canadian restaurant client, remotely in English with their team: an Nx monorepo with two React apps (customer kiosk and kitchen display) sharing API and UI libraries, deployed as separate Docker images behind nginx.
- Real-time order sync between kiosk and kitchen over WebSockets with a polling fallback; thermal receipt printing with automatic network → USB fallback; a version checker that reloads always-on kiosks when a new build ships.

### RexRx | Online prescription pharmacy PWA | Front-End Developer · remote contract (Canada), part-time | Dec 2025 – Mar 2026
stack: Angular 17, TypeScript, Signals, PWA / Service Worker, SCSS

#### bullets
- Built the installable Angular PWA of a Canadian online pharmacy for GLP-1 treatments: a server-driven adaptive medical questionnaire for eligibility screening, signal-based session management, CAPTCHA-protected auth and a multi-step prescription checkout.

## Toolkit

### Front-End
TypeScript (6 yrs), JavaScript (ES2015+), Angular 17–22 (5 yrs), React, Vue / Nuxt, RxJS, Signals, HTML5, CSS3 / SCSS / Tailwind, Responsive & RTL UI, PWA / Service Workers, SSR & SEO, Web performance

### Backend
Java 21, Spring Boot 3, JPA / Hibernate, MySQL, MongoDB, Redis, Node.js tooling, PHP / Laravel (basic)

### Architecture
Nx Monorepo, app / shell / applet layering, shared npm package design, state machines, REST / OpenAPI 3.1 contract-first APIs, Microservices

### Testing & Quality
Playwright (E2E, visual regression), Jest, Karma / Jasmine, Testcontainers, Mockito, snapshot testing, code review, CI quality gates

### Tooling & DevOps
Git, GitLab CI, GitHub Actions, Docker, nginx, Sentry, Google Tag Manager, Figma, Agile / Scrum

### AI-Assisted Engineering
Claude Code (agents, skills, slash commands), MCP (Figma), AI code review, AI test generation, multi-agent delivery pipelines with human review gates

## Education

### Islamic Azad University, Central Tehran Branch | Tehran, Iran | B.Sc. Computer Engineering | 2017 – 2022

## Languages

- English | Fluent (professional working proficiency)
- Persian | Native

## Courses

- Claude Code in Action | Anthropic | 2026
- The Complete Guide to Becoming a Software Architect | Udemy | 2025
- Angular — The Complete Guide | Udemy | 2024
- UTACM-Cafebazaar Android Course | University of Tehran | 2019
- Agile Software Development: Clean Coding Practices & Refactoring | LinkedIn Learning
- Test Automation Foundations | LinkedIn Learning
- Agile Testing | LinkedIn Learning
- JavaScript: Classes | LinkedIn Learning
- Interactive Animations with CSS and JavaScript | LinkedIn Learning
- Bootstrap 4 with Sass | LinkedIn Learning
- JavaScript for Web Designers | LinkedIn Learning
