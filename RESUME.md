---
name: Iman Amini
role: Software Engineer
subtitle: Front-End Focused · Full-Stack with Java / Spring Boot
tagline: I build products people trust with their money — from fintech flows used by 10M+ people to full-stack platforms built from the database up.
headline: **Front-end owner of Digipay's payment (checkout) product**, Digikala Group's fintech arm, after 4+ years owning its **Credit & BNPL front-end** — payment, wallet and credit flows for **10M+ users** · **Founder of XPCard**, built from scratch with AI agents · **Remote front-end work for international teams in Canada and the UK**
availability: Open to international roles · Remote / Hybrid / On-site · Fluent English
email: iman.fa88@gmail.com
phone: +98-9034646366
portfolio_url: https://imanamini.ir
portfolio_label: imanamini.ir
linkedin_url: https://www.linkedin.com/in/imanamini78
linkedin_label: linkedin.com/in/imanamini78
github_url: https://github.com/imanamini
github_label: github.com/imanamini
---

## Pitch

Software engineer with a front-end core and real backend depth, who can carry a product end to end. At Digipay, Iran's largest digital-payments platform, I owned the entire Credit & BNPL front-end for more than four years, and since July 2026 I own the front-end of its payment (checkout) product, with flows used by 10M+ people. I also ship to its Java / Spring Boot microservices. I have also worked remotely as the front-end developer for **international teams in Canada and the UK**. In 2026 I founded XPCard and built the whole platform from scratch on my own, from the Spring Boot backend and databases to the Angular apps and production infrastructure. I used an AI-agent workflow I designed and kept architecture, review and releases in my own hands. I am looking for an international team to do my best work with.

## Summary

Software engineer focused on front-end with production backend experience — 5+ years of Angular and TypeScript at scale in fintech, plus Java 21 / Spring Boot services, relational and document databases, and the infrastructure that runs them. Front-end owner of Digipay's payment product (since Jul 2026) after owning its Credit & BNPL front-end, serving 10M+ users, at Iran's largest digital payment platform and architected 14 shared npm packages across a 75-package monorepo. Founder and sole engineer of XPCard, an e-commerce platform for digital goods built from scratch in three months: a Spring Boot modular monolith on MySQL, MongoDB and Redis, contract-first OpenAPI APIs, Angular storefront and admin apps, and a Dockerized production stack. Designed a contract-first, AI-assisted engineering workflow (Claude Code agents for planning, implementation, QA and review) with human-owned architecture and approval gates.

## Stats

- 10M+ · users on flows I own
- 5+ · years in fintech engineering
- 14 · shared npm packages shipped
- 75 · package monorepo I help steer

## Skills

Angular, TypeScript, RxJS, Signals, NX Monorepo, React, Next.js, Vue, Nuxt, Java 21, Spring Boot, JPA / Hibernate, MySQL, MongoDB, Redis, REST / OpenAPI, Testcontainers, Docker, CI/CD, Playwright, Jest, Karma/Jasmine, SCSS/CSS, WordPress / PHP, Technical SEO, AI-assisted development (Claude Code), Git, Figma, Agile/Scrum

## Experience

### Digipay | Tehran, Iran | Senior Front-End Engineer · Front-End Owner | Dec 2021 – Present
about: Payments and credit arm of **Digikala Group**, Iran's largest e-commerce company.
tags: Angular, TypeScript, NX Monorepo, RxJS, Signals, Playwright

#### featured
- **Front-end owner of Digipay's payment (checkout) product since Jul 2026**, after owning the entire Credit & BNPL front-end (Dec 2021 – Jul 2026) — multi-step financial journeys in Angular + TypeScript that 10M+ people rely on every day.
- Architected and shipped 14 shared npm packages, cutting cross-team duplication and accelerating delivery across every product line.
- Set the front-end technical direction for the Credit & BNPL and payment lines and mentor the engineers building them.
- Own Digipay's purchase (checkout) app: merged two production payment apps into one, put it under a Playwright E2E safety net, and upgraded it to Angular 22 / Nx 23.

#### bullets
- Merged the Credit (~340 TS files) and Web-Pay (~500 TS files) Angular apps into a single purchase app serving web.mydigipay.com. A depth-preserving layout let ~840 files move without source edits, both apps became route subtrees so every published URL kept working, and each tree kept its global styles through isolated shell components.
- Rolled the merged app out in parallel with the old ones behind nginx, cut over in production after QA sign-off, then deleted the two standalone apps; the payment flows kept running without user-facing regressions.
- Built a Playwright E2E suite for the checkout that runs against the real UAT backend: merchant-ticket API fixtures, page objects on stable data-testids, OTP codes read from the UAT OTP catcher, mobile runs and a screenshot-per-action report, covering 47 wallet, credit/BNPL, bank-gateway and error-recovery scenarios.
- The E2E suite found and fixed 11 app bugs, 7 of which left users stuck mid-payment (each verified by reverting the fix and watching the test fail), and surfaced 4 backend findings including a double-payment risk.
- Upgraded both front-end monorepos from Angular 17 / Nx 18 to Angular 22 / Nx 23 (TypeScript 6, ESLint 9) — the client monorepo (17 repos, 110+ Nx projects) and the payment monorepo (~1,150 files): built-in control flow, signal inputs/outputs, Hammer.js replaced by a custom pointer-event swipe directive, with E2E runs after every step.
- Migrated three standalone Angular applications (web-wallet, credit, merchant-credit) into a unified NX monorepo with shared libs/ structure, consolidating dependencies and enabling cross-app code reuse.
- Established a multi-layer testing strategy across 75 shared npm packages: Karma/Jasmine unit tests for signal-based component logic and OnPush behavioral contracts, Playwright E2E tests for computed CSS, animation, and input-variant contracts, and a dual snapshot system (style .txt + visual .png) as backward-compatibility guards.
- Engineered a 7-step credit pre-registration state machine with conditional step-skipping logic, BehaviorSubject-driven reactive state, dynamic plan filtering by fund provider and collateral type, and bidirectional URL–step synchronization via query parameters.
- Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives for document image inspection, implementing multi-touch distance calculation, boundary-constrained CSS transforms, and requestAnimationFrame-throttled magnifier with rotation-aware coordinate mapping.
- Designed a Claude AI–assisted test generation pipeline for a 75-package Angular component library, engineering a 900-line reusable prompt specification that encodes testing principles, Angular signal patterns, OnPush behavioral contracts, and Playwright pitfalls.
- Built a zero-maintenance test catalog CLI (generate-package-status.mjs) that auto-discovers unit and E2E specs across all 75 packages, counts individual test cases via regex, and generates a typed TypeScript data file powering a live status dashboard.
- Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed properties across the entire Credit/BNPL library, eliminating NgModule overhead.
- Implemented a custom Angular preloading strategy using route metadata (preload: true, critical: true) to load critical routes immediately post-bootstrap, alongside retryImport wrappers for network-resilient lazy module loading.
- Integrated multi-platform analytics (Google Tag Manager, a marketing-automation SDK, Sentry) behind a single EventManagementService abstraction, with Sentry configured for performance profiling and console-error capture.
- Built biometric identity verification feature with selfie video capture and liveness photo for digital document signing.
- Developed Mydigipay website by Laravel & Angular.

backend_label: Backend Contributions
backend_stack: Java / Spring Boot  ·  PHP

#### backend
- Instrumented the Credit Onboarding Java (Spring Boot) service end-to-end with Micrometer metrics — campaign wallet creation, credit scoring, OTP (send / resend / verify), BNPL inquiry & allocation, sequential and volunteer activation flows.
- Fixed production Java bugs across microservices: NullPointerException in the blocking-detail service, journal double-linking on duplicate trackingCodes, and BNPL SMS double-activation — each covered with unit tests.
- Implemented a configurable time-window scoring-provider switch in the credit-scoring Java service, enabling dynamic selection between two external scoring engines on a scheduled basis.
- Built bank-partnership Credit Club and Installment Cheque landing pages in PHP on the Digipay marketing website, integrating credit-installment REST APIs.

### XPCard | Remote | Founder & Software Engineer | Jul 2026 – Present
about: Gift-card and gaming-credit marketplace I built from scratch with AI agents; **1B+ toman GMV in its first two months**.
tags: Java 21, Spring Boot 3, MySQL, MongoDB, Redis, Docker, Angular 20, Nx, OpenAPI, Claude Code
backend_label: Backend Engineering
backend_stack: Java 21  ·  Spring Boot 3  ·  MySQL  ·  MongoDB  ·  Redis

#### featured
- Founded and built from scratch, as the only engineer, a live marketplace for gift cards, game accounts and game top-ups: a Spring Boot backend, customer storefront, admin dashboard, chat-bot sales channel and an SEO content site, all in production within about three months.
- Designed the system architecture and an AI-assisted delivery workflow around it. I own the product decisions, the architecture, the API contracts and the final review of every change; AI agents handle repetitive implementation, test and verification work inside guardrails I defined.
- The platform has processed 250 transactions since launch, with traffic coming from organic search through a content site and technical SEO I built.

#### bullets
- Architected a four-repository system: a platform repo for product docs, API contracts and infrastructure, a Spring Boot backend, an Angular / Nx front-end monorepo with storefront and admin apps, and a CMS theme for the marketing site.
- Built the storefront and admin dashboard in Angular 20 on Nx: standalone components, signals, OnPush everywhere, domain libraries split into feature / ui / data-access layers with enforced boundaries, an RTL design system, Jest unit tests and Playwright E2E.
- Built a multi-agent development pipeline with Claude Code: a PM agent turns the PRD into feature briefs, an architect agent turns a brief into an API contract and per-repo tasks, and each repo runs dev → adversarial QA → code-review agents against written acceptance criteria. Every merge to production goes through my review.
- Encoded engineering standards as guardrails the agents cannot skip: per-repo coding rules, Definition-of-Done gates (lint, tests, build), design-to-code checks with Playwright screenshots, git hooks that block direct pushes to production, and build-time configuration guards.
- Delivered about 115 features and 880+ tasks in three months, a pace a solo engineer could not reach without the pipeline, with test coverage and contract parity enforced on every change.

#### backend
- Designed the backend as a Java 21 / Spring Boot 3 modular monolith with 10+ domain modules (catalog, order, payment, wallet, auth, discount, KYC, supplier, admin, chat-bot) that talk only through public service interfaces, with layered api → service → repository packages and DTOs at every boundary.
- Ran the API contract-first: 27 OpenAPI 3.1 specs are the single boundary between front-end and back-end, with versioned paths, RFC-7807 problem-detail errors and integer minor-unit money end to end.
- Modeled persistence per workload: MySQL with JPA and 140+ versioned Flyway migrations for transactional data (orders, payments, wallet ledger), MongoDB for the flexible product catalog, and Redis for OTP codes, rate limiting and caching.
- Built the order and payment core: an order state machine, integrations with multiple payment gateways, a customer wallet, bulk discount-code batches, and phone-OTP authentication with JWT sessions.
- Automated fulfillment through wholesale supplier APIs: scheduled catalog sync, automatic purchase and delivery of digital codes, signed webhook handling and a supplier ledger, with real purchases gated behind a feature flag for safe rehearsal.
- Covered the backend with nearly 1,000 test files — fast Mockito unit tests plus Testcontainers integration tests on real MySQL, MongoDB and Redis, sharing one Spring context to keep the full suite fast.
- Run production myself: Docker Compose on a single VPS, self-hosted GitHub Actions runners with deploy locking, a TLS edge proxy, CDN and page caching, and a rehearsal environment seeded from anonymized production data for risky migrations.

### Adowing | Tehran, Iran | Front-End Developer | Oct 2019 – Dec 2021
tags: Vue, Nuxt, Agile

#### bullets
- Developed internal panels for the marketing team, accounting team & other departments.
- Built pixel-perfect UIs in different sizes according to the design.
- Researched the agile approach with the product team and implemented it.
- Researched test methods like unit test, integration test, regression test & acceptance test.
- Researched clean code methods and developed products with them.
- Mentored a front-end developer intern.

### Carnotic | Tehran, Iran | Front-End Developer | Oct 2019 – Dec 2021
about: Online freight-forwarding platform.
tags: Nuxt, SEO

#### bullets
- Implemented a highly responsive user interface for a freight forwarding platform.
- Built pixel-perfect UIs in different sizes according to the design.
- Packed customized video player from "Talent Academy" project and used in Carnotic.
- Implemented this Nuxt app for SEO purposes.
- Documented components and wrote test cases for all methods.

### Freelance | Tehran | Android Developer | Oct 2014 – Oct 2015
tags: Android, B4A

#### bullets
- Developed 10 apps and published them on the main Iranian Android app stores.
- Implemented with B4A (Basic for Android) that is based on VisualBasic language.
- All applications were content-driven.

## Projects

### Origins | Ethical payments & rewards wallet | Front-End Developer | Sep 2026 – Present
international: United Kingdom · Remote
about: UK fintech building a rewards wallet and BNPL access for credit-invisible consumers.
stack: React Native, React, TypeScript
featured: true

#### bullets
- Built the marketing landing pages; now building the React Native mobile app for the wallet, working remotely with the UK team.

### Pita | Restaurant Kiosk + Kitchen Display System | Architect & Lead Frontend | 2024 – 2025
international: Canada · Remote
stack: React, NX Monorepo, WebSockets, Docker, TypeScript
featured: true

Built remotely in English with a **Canadian client's team**: a two-app React/NX monorepo for self-service restaurant ordering — a customer-facing kiosk and a kitchen display — sharing @pita/api and @pita/ui, deployed as separate Docker images behind nginx routing.

#### bullets
- Integrated the Epson ePOS SDK for thermal receipt printing with automatic network → USB fallback, plus mobile-device and browser-print safety nets.
- Real-time order sync between kiosk and kitchen over Laravel Echo + Pusher WebSockets, with a 10-second polling backup and a live in-process vs ready KDS board.
- Zero-downtime version checker for always-on hardware — polls a cache-busted /version.json and forces a hard reload on new builds.

### RexRx | Online prescription pharmacy PWA | Front-End Developer | 2024
international: Canada · Remote
stack: Angular 17, PWA, Signals, Service Worker
featured: true

Front-end for a **Canadian** online pharmacy for GLP-1 weight-loss treatments (Ozempic, Wegovy, Mounjaro): a full Angular 17 PWA, built around a server-driven adaptive questionnaire engine with offline support.

#### bullets
- Server-driven adaptive medical questionnaire (SingleChoice / MultipleChoice / FormFill / Terminate) — each question fetched from the API based on the previous answer for personalised eligibility screening.
- Signal-based session management, CAPTCHA-protected auth, multi-step drug selection & checkout, in-app support chat, and a Service Worker for offline use.

### Talent Academy | Interactive video learning platform | Frontend Engineer | 2021
stack: Vue, Custom video player

Interactive video player with playlists, instructor feedback messages, and global SSO for internal platforms.

### Majid | Online form builder (confidential) | Frontend Engineer | 2020 – 2021
stack: Angular, Complex JSON

Drag-and-drop, JotForm-style form builder — schema-driven UI with deep nested-JSON handling and live preview.

## Toolkit

### core
Angular · 5y, React / Next.js · 4y, TypeScript · 5y, NX Monorepo · 3y

### proficient
RxJS, Vue, Nuxt, Playwright, Jest, Karma/Jasmine, SCSS / Tailwind, PWA / Service Workers

### backend
Java 21, Spring Boot, JPA / Hibernate, MySQL, MongoDB, Redis, REST / OpenAPI, Testcontainers, Docker, PHP

### familiar
GitHub Actions, WordPress, Technical SEO, Claude Code / AI agents, WebSockets, Git, Figma, Agile/Scrum

## Education

### Islamic Azad University Central Tehran Branch | Tehran | Computer Engineering — Bachelor | 2017 – 2022

### Imam Sadiq Highschool | Tehran | Mathematics and Physics — Diploma | 2013 – 2017

## Languages

- English | Fluent
- Persian | Native

## Courses

- Claude Code in Action | Anthropic | Feb 2026
- The Complete Guide to Becoming a Software Architect | Udemy | Apr 2025
- Angular — The Complete Guide (2024 Edition) | Udemy
- UTACM-Cafebazaar Android Course | Cafebazaar & University of Tehran | Winter 2019
- Agile Software Development: Clean Coding Practices | LinkedIn
- Test Automation Foundations | LinkedIn
