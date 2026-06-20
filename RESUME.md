---
name: Iman Amini
role: Senior Front-End Engineer
tagline: I build financial products that 10M+ people trust with their money.
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

Senior frontend engineer who turns complex financial journeys into flows that feel effortless. For the past five years I have built and led the Credit & BNPL frontend at Digipay — Iran's largest digital-payments platform — where the screens I own are used by more than 10 million people. I architect shared design systems, set technical direction, and lift the engineers around me. Equally fluent in Angular, React / Next.js and Vue, I learn new stacks fast and I am looking for an international team to do my best work with.

## Summary

Senior Frontend Engineer with 5+ years of experience in fintech, specializing in Angular and TypeScript at scale. Led development of Credit & BNPL flows serving 10M+ users at Iran's largest digital payment platform. Architected 14 shared npm packages and established multi-layer testing strategies across 75-package monorepos. Fluent across Angular, React/Next.js, and Vue/Nuxt — known for picking up new stacks quickly and thriving in collaborative, cross-functional teams.

## Stats

- 10M+ · users on flows I own
- 5+ · years in fintech frontend
- 14 · shared npm packages shipped
- 75 · package monorepo I help steer

## Skills

Angular, TypeScript, RxJS, NX Monorepo, React, Next.js, Vue, Nuxt, Playwright, Karma/Jasmine, SCSS/CSS, Git, REST APIs, Figma, Agile/Scrum

## Experience

### Digipay | Tehran | Senior Front-End Engineer | Dec 2021 – Present
tags: Angular, TypeScript, NX Monorepo, RxJS, Signals

#### featured
- Lead the Credit & BNPL frontend — multi-step financial journeys in Angular + TypeScript that 10M+ people rely on every day.
- Architected and shipped 14 shared npm packages, cutting cross-team duplication and accelerating delivery across every product line.
- Set the technical direction for the Credit & BNPL line and mentor the engineers building it.

#### bullets
- Migrated three standalone Angular applications (web-wallet, credit, merchant-credit) into a unified NX monorepo with shared libs/ structure, consolidating dependencies and enabling cross-app code reuse.
- Established a multi-layer testing strategy across 75 shared npm packages: Karma/Jasmine unit tests for signal-based component logic and OnPush behavioral contracts, Playwright E2E tests for computed CSS, animation, and input-variant contracts, and a dual snapshot system (style .txt + visual .png) as backward-compatibility guards.
- Engineered a 7-step credit pre-registration state machine with conditional step-skipping logic, BehaviorSubject-driven reactive state, dynamic plan filtering by fund provider and collateral type, and bidirectional URL–step synchronization via query parameters.
- Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives for document image inspection, implementing multi-touch distance calculation, boundary-constrained CSS transforms, and requestAnimationFrame-throttled magnifier with rotation-aware coordinate mapping.
- Designed a Claude AI–assisted test generation pipeline for a 75-package Angular component library, engineering a 900-line reusable prompt specification that encodes testing principles, Angular signal patterns, OnPush behavioral contracts, and Playwright pitfalls.
- Built a zero-maintenance test catalog CLI (generate-package-status.mjs) that auto-discovers unit and E2E specs across all 75 packages, counts individual test cases via regex, and generates a typed TypeScript data file powering a live status dashboard.
- Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed properties across the entire Credit/BNPL library, eliminating NgModule overhead.
- Implemented a custom Angular preloading strategy using route metadata (preload: true, critical: true) to load critical routes immediately post-bootstrap, alongside retryImport wrappers for network-resilient lazy module loading.
- Integrated multi-platform analytics (Google Tag Manager, InTrack, Sentry) behind a single EventManagementService abstraction, with Sentry configured for performance profiling and console-error capture.
- Built biometric identity verification feature with selfie video capture and liveness photo for digital document signing.
- Developed Mydigipay website by Laravel & Angular.

#### backend
- Instrumented the Credit Onboarding Java (Spring Boot) service end-to-end with Micrometer metrics — campaign wallet creation, SMC scoring, ICS OTP (send / resend / verify), BNPL inquiry & allocation, sequential and volunteer activation flows.
- Fixed production Java bugs across microservices: NullPointerException in the blocking-detail service, journal double-linking on duplicate trackingCodes, and BNPL SMS double-activation — each covered with unit tests.
- Implemented a configurable time-window scoring-provider switch in the SMC Java service, enabling dynamic selection between ICS and BANK_SCORE engines on a scheduled basis.
- Built Credit Club (Mellat & Tejarat) and Installment Cheque landing pages in PHP on the Digipay marketing website, integrating credit-installment REST APIs.

### Adowing | Tehran | Front-End Developer | Oct 2019 – Dec 2021
tags: Vue, Nuxt, Agile

#### bullets
- Developed internal panels for the marketing team, accounting team & other departments.
- Built pixel-perfect UIs in different sizes according to the design.
- Researched the agile approach with the product team and implemented it.
- Researched test methods like unit test, integration test, regression test & acceptance test.
- Researched clean code methods and developed products with them.
- Mentored a front-end developer intern.

### Carnotic | Tehran | Front-End Developer | Oct 2019 – Dec 2021
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
- Developed 10 apps and published them in Cafebazaar, Myket and Candoo.
- Implemented with B4A (Basic for Android) that is based on VisualBasic language.
- All applications were content-driven.

## Projects

### Pita | Restaurant Kiosk + Kitchen Display System | Architect & Lead Frontend | 2024 – 2025
stack: React, NX Monorepo, WebSockets, Docker, TypeScript
featured: true

A two-app React/NX monorepo for self-service restaurant ordering — a customer-facing kiosk and a kitchen display — sharing @pita/api and @pita/ui, deployed as separate Docker images behind nginx routing.

#### bullets
- Integrated the Epson ePOS SDK for thermal receipt printing with automatic network → USB fallback, plus mobile-device and browser-print safety nets.
- Real-time order sync between kiosk and kitchen over Laravel Echo + Pusher WebSockets, with a 10-second polling backup and a live in-process vs ready KDS board.
- Zero-downtime version checker for always-on hardware — polls a cache-busted /version.json and forces a hard reload on new builds.

### Pharma | Prescription Drug E-commerce PWA | Frontend Engineer | 2024
stack: Angular 17, PWA, Signals, Service Worker
featured: true

A full Angular 17 PWA for prescription pharmaceutical e-commerce, built around a server-driven adaptive questionnaire engine with offline support.

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
RxJS, Vue, Nuxt, Playwright, Karma/Jasmine, SCSS / Tailwind, PWA / Service Workers

### familiar
Java / Spring Boot, PHP, WebSockets, Pusher, Laravel Echo, Docker, Git, REST APIs, Figma, Agile/Scrum

## Education

### Islamic Azad University Central Tehran Branch | Tehran | Computer Engineering — Bachelor | 2017 – 2022

### Imam Sadiq Highschool | Tehran | Mathematics and Physics — Diploma | 2013 – 2017

## Courses

- Claude Code in Action | Anthropic | Feb 2026
- The Complete Guide to Becoming a Software Architect | Udemy | Apr 2025
- Angular — The Complete Guide (2024 Edition) | Udemy
- UTACM-Cafebazaar Android Course | Cafebazaar & University of Tehran | Winter 2019
- Agile Software Development: Clean Coding Practices | LinkedIn
- Agile Software Development: Refactoring | LinkedIn
- JavaScript: Classes | LinkedIn
- Test Automation Foundations | LinkedIn
- Agile Testing | LinkedIn
- Bootstrap 4 with Sass | LinkedIn
- Interactive Animations with CSS and JavaScript | LinkedIn
- JavaScript for Web Designers | LinkedIn
