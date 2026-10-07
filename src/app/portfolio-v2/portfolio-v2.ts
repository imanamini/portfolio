import { Component, HostBinding, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';
import { AuthService } from '../core/auth.service';

interface MenuLink { label: string; icon: string; route: string; }

interface StackPrimary { name: string; years: number; }
interface Highlight { tag: string; title: string; body: string; }
interface ContactLink { label: string; value: string; href: string; }
interface Project {
  name: string;
  sub: string;
  stack: string[];
  period: string;
  role: string;
  featured?: boolean;
  international?: string;
  body: string;
  bullets?: string[];
}
interface Challenge { title: string; body: string; }

@Component({
  selector: 'app-portfolio-v2',
  imports: [NgFor, NgIf],
  templateUrl: './portfolio-v2.html',
  styleUrl: './portfolio-v2.scss',
})
export class PortfolioV2Component {
  r = RESUME;
  private print = inject(PrintService);
  private router = inject(Router);
  auth = inject(AuthService);

  @HostBinding('attr.data-theme') get themeAttr() { return this.theme(); }

  theme = signal<'dark' | 'light'>('dark');
  scrolled = signal(false);
  expanded = signal<Record<number, boolean>>({ 0: true });
  menuOpen = signal(false);

  // Private hub links, only shown in the small menu when logged in.
  menuLinks: MenuLink[] = [
    { label: 'Hub', icon: '\u{1F3E0}', route: '/home' },
    { label: 'Finance', icon: '\u{1F4B0}', route: '/finance' },
    { label: 'Expenses', icon: '\u{1F9FE}', route: '/expenses' },
    { label: 'Learn', icon: '\u{1F4DA}', route: '/learn' },
  ];

  // Secret login gate: 10 rapid clicks on the name navigate to /login.
  private loginClicks = 0;
  private loginClickTimer: ReturnType<typeof setTimeout> | null = null;

  firstName = 'Iman';
  lastName = 'Amini';
  role = 'Software Engineer';
  focus = 'Front-End Focused \u00B7 Full-Stack with Java / Spring Boot';

  stats = [
    { value: '10M+', label: 'Users on payment flows I own' },
    { value: '7,400+', label: 'Automated tests in suites I built' },
    { value: '20', label: 'Claude agents, skills & commands I wrote' },
    { value: '14', label: 'Shared npm packages published' },
  ];

  experiences = [
    {
      company: 'Digipay',
      role: 'Senior Front-End Engineer \u00B7 Front-End Owner',
      period: 'Dec 2021 — Present',
      location: 'Tehran, Iran',
      about: 'Payments and credit arm of Digikala Group, Iran\u2019s largest e-commerce company.',
      international: '',
      summary: 'Front-end owner of Digipay\u2019s payment (checkout) product since Jul 2026, after owning the entire Credit & BNPL front-end for 4+ years \u2014 with backend contributions to its Java services.',
      tags: ['Angular', 'TypeScript', 'NX Monorepo', 'RxJS', 'Signals', 'Playwright', 'Claude Code'],
      featured: [
        'Front-end owner of Digipay\u2019s payment (checkout) product since Jul 2026; before that I owned the entire Credit & BNPL front-end (Dec 2021 \u2013 Jul 2026). Flows used by 10M+ people.',
        'Merged two production payment apps into one, put the checkout under a Playwright E2E safety net, and upgraded both front-end monorepos to Angular 22 / Nx 23.',
        'Made Claude Code part of the front-end workflow with agents and commands I wrote \u2014 a full test spec went from 1 day to under 1 hour.',
        'Architected and published 14 shared npm packages, and mentor the engineers on my product lines.',
      ],
      bullets: [
        'Merged the Credit (~340 TS files) and Web-Pay (~500 TS files) Angular apps into a single purchase app serving web.mydigipay.com: ~840 files moved without source edits, every published URL kept working as a route subtree, rolled out in parallel behind nginx, then cut over in production.',
        'Built a Playwright E2E suite for the checkout that pays through the real backend \u2014 47 wallet, credit/BNPL, bank-gateway and error-recovery scenarios with merchant-ticket fixtures, page objects, OTP automation and screenshot reports. It caught bugs that left users stuck mid-payment and a double-payment risk.',
        'Built the whole test setup and the playground demo app for the 80-package UI library: 3,150+ Playwright E2E / visual tests, 4,200+ unit tests and 770 visual baselines.',
        'Upgraded both front-end monorepos from Angular 17 / Nx 18 to Angular 22 / Nx 23 \u2014 the client monorepo (17 repos, 110+ Nx projects) and the payment monorepo (~1,150 files): built-in control flow, signal inputs/outputs, and a custom pointer-event swipe directive replacing Hammer.js.',
        'Wrote Figma-MCP dev \u2192 QA \u2192 design-review agents with a shared lessons file, AI code-review commands for staging and production merge requests, and commands that write and fix component tests; library regressions reaching QA dropped to near zero.',
        'Migrated three standalone Angular apps into a unified NX monorepo with shared libs, consolidating dependencies and enabling cross-app code reuse.',
        'Established a multi-layer testing strategy across 75 packages: Karma/Jasmine unit tests, Playwright E2E, and a dual snapshot system (style + visual) as backward-compatibility guards.',
        'Engineered a 7-step credit pre-registration state machine with conditional step-skipping, BehaviorSubject-driven reactive state, and bidirectional URL↔step sync.',
        'Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives for document inspection — multi-touch distance calculation, boundary-constrained CSS transforms, and rAF-throttled magnifier with rotation-aware coordinate mapping.',
        'Implemented a custom Angular preloading strategy using route metadata (preload: true, critical: true) with retryImport wrappers for network-resilient lazy module loading.',
        'Designed a Claude AI-assisted test generation pipeline for 75 Angular packages — a 900-line reusable prompt specification encoding testing principles and Angular patterns.',
        'Built a zero-maintenance test collection CLI that auto-discovers spec files across all 75 packages, counts test cases via regex, and generates a typed TypeScript data file powering a live status dashboard.',
        'Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed properties across the Credit/BNPL library.',
        'Built a biometric identity verification feature with selfie-video capture and liveness photo for digital document signing.',
      ],
      backendLabel: 'Backend Contributions \u00B7 Java / Spring Boot \u00B7 PHP',
      backendBullets: [
        'Instrumented the Credit Onboarding Java (Spring Boot) service with Micrometer metrics end-to-end — credit scoring, OTP, BNPL inquiry/allocation, campaign wallet, sequential and volunteer activation flows.',
        'Fixed production Java bugs: NullPointerException in the blocking-detail service, journal double-linking on duplicate tracking codes, and BNPL SMS double-activation — each with unit test coverage.',
        'Implemented a configurable time-window switch in the credit-scoring Java service, selecting between two external scoring engines on a schedule.',
        'Built bank-partnership Credit Club and Installment Cheque landing pages in PHP, integrating credit-installment REST APIs.',
      ],
      challenge: {
        title: 'Merging two live payment apps into one without breaking a single URL',
        body: 'Credit and Web-Pay (~840 TypeScript files) had to become one app while real payments kept flowing. I designed a layout that moved every file without editing its source, kept every published URL working as a route subtree, ran both versions side by side behind nginx, then cut over in production with no user-facing regressions.',
      } as Challenge,
    },
    {
      company: 'XPCard',
      role: 'Founder & Software Engineer',
      period: 'Jul 2026 — Present',
      location: 'Remote',
      about: 'Gift-card and gaming-credit marketplace I built from scratch with AI agents \u2014 1B+ toman GMV in its first two months.',
      international: '',
      summary: 'Built a live marketplace for gift cards, game accounts and game top-ups from scratch as the only engineer — backend, storefront, admin dashboard, chat-bot channel and SEO content site.',
      tags: ['Java 21', 'Spring Boot 3', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Angular 20', 'Nx', 'OpenAPI', 'Claude Code'],
      featured: [
        'Founded and built the whole platform from scratch, from the Spring Boot backend and databases to the Angular apps and production infrastructure, live within about three months.',
        'Designed the system architecture and an AI-assisted delivery workflow around it. I own the product decisions, the architecture, the API contracts and the final review of every change; AI agents handle repetitive implementation, test and verification work inside guardrails I defined.',
        'The platform has processed 250 transactions since launch, with traffic coming from organic search through a content site and technical SEO I built.',
      ],
      bullets: [
        'Architected a four-repository system: a platform repo for product docs, API contracts and infrastructure, a Spring Boot backend, an Angular / Nx front-end monorepo with storefront and admin apps, and a CMS theme for the marketing site.',
        'Built the storefront and admin dashboard in Angular 20 on Nx: standalone components, signals, OnPush everywhere, domain libraries split into feature / ui / data-access layers with enforced boundaries, an RTL design system, Jest unit tests and Playwright E2E.',
        'Built a multi-agent development pipeline with Claude Code: a PM agent turns the PRD into feature briefs, an architect agent turns a brief into an API contract and per-repo tasks, and each repo runs dev → adversarial QA → code-review agents against written acceptance criteria. Every merge to production goes through my review.',
        'Encoded engineering standards as guardrails the agents cannot skip: per-repo coding rules, Definition-of-Done gates (lint, tests, build), design-to-code checks with Playwright screenshots, git hooks that block direct pushes to production, and build-time configuration guards.',
        'Delivered about 115 features and 880+ tasks in three months, a pace a solo engineer could not reach without the pipeline, with test coverage and contract parity enforced on every change.',
      ],
      backendLabel: 'Backend Engineering \u00B7 Java 21 \u00B7 Spring Boot 3 \u00B7 MySQL \u00B7 MongoDB \u00B7 Redis',
      backendBullets: [
        'Designed the backend as a Java 21 / Spring Boot 3 modular monolith with 10+ domain modules (catalog, order, payment, wallet, auth, discount, KYC, supplier, admin, chat-bot) that talk only through public service interfaces, with layered api → service → repository packages and DTOs at every boundary.',
        'Ran the API contract-first: 27 OpenAPI 3.1 specs are the single boundary between front-end and back-end, with versioned paths, RFC-7807 problem-detail errors and integer minor-unit money end to end.',
        'Modeled persistence per workload: MySQL with JPA and 140+ versioned Flyway migrations for transactional data (orders, payments, wallet ledger), MongoDB for the flexible product catalog, and Redis for OTP codes, rate limiting and caching.',
        'Built the order and payment core: an order state machine, integrations with multiple payment gateways, a customer wallet, bulk discount-code batches, and phone-OTP authentication with JWT sessions.',
        'Automated fulfillment through wholesale supplier APIs: scheduled catalog sync, automatic purchase and delivery of digital codes, signed webhook handling and a supplier ledger, with real purchases gated behind a feature flag for safe rehearsal.',
        'Covered the backend with nearly 1,000 test files — fast Mockito unit tests plus Testcontainers integration tests on real MySQL, MongoDB and Redis, sharing one Spring context to keep the full suite fast.',
        'Run production myself: Docker Compose on a single VPS, self-hosted GitHub Actions runners with deploy locking, a TLS edge proxy, CDN and page caching, and a rehearsal environment seeded from anonymized production data for risky migrations.',
      ],
      challenge: {
        title: 'Shipping a full product alone at team speed',
        body: 'I designed a Claude Code multi-agent pipeline (PM \u2192 architect \u2192 dev \u2192 QA \u2192 review) with guardrails the agents cannot skip: lint, tests, build and screenshot checks on every change. It delivered ~115 features in three months, and I still review every merge myself.',
      } as Challenge,
    },
    {
      company: 'Adowing',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran, Iran',
      about: '',
      international: '',
      summary: '',
      tags: ['Vue', 'Nuxt', 'Agile'],
      featured: [] as string[],
      bullets: [
        'Developed internal panels for marketing, accounting and other departments using Vue/Nuxt.',
        'Researched and implemented agile process with the product team.',
        'Mentored a front-end developer intern.',
      ],
    },
    {
      company: 'Carnotic',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran, Iran',
      about: 'Online freight-forwarding platform.',
      international: '',
      summary: '',
      tags: ['Nuxt', 'SEO'],
      featured: [] as string[],
      bullets: [
        'Built a responsive freight-forwarding platform with pixel-perfect implementations.',
        'Implemented a Nuxt.js app for SEO optimization.',
        'Documented components and wrote test cases for all methods.',
      ],
    },
  ];

  stackPrimary: StackPrimary[] = [
    { name: 'Angular', years: 5 },
    { name: 'React / Next.js', years: 4 },
    { name: 'TypeScript', years: 5 },
    { name: 'NX Monorepo', years: 3 },
  ];
  stackSecondary = ['RxJS', 'Vue', 'Nuxt', 'Playwright', 'Jest', 'Karma/Jasmine', 'SCSS / Tailwind', 'PWA / Service Workers'];
  stackBackend = ['Java 21', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'MongoDB', 'Redis', 'REST / OpenAPI', 'Testcontainers', 'Docker', 'PHP'];
  stackAi = ['Claude Code', 'Multi-agent workflows', 'MCP (Figma)', 'AI code review', 'AI test generation', 'Project rules & slash commands'];
  stackFamiliar = ['React Native', 'GitHub Actions', 'WordPress', 'Technical SEO', 'WebSockets', 'Git', 'Figma', 'Agile/Scrum'];

  languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Persian', level: 'Native' },
  ];

  projects: Project[] = [
    {
      name: 'Origins',
      sub: 'Ethical payments & rewards wallet',
      stack: ['React Native', 'React', 'TypeScript'],
      period: 'Sep 2026 — Present',
      role: 'Front-End Developer',
      featured: true,
      international: 'United Kingdom \u00B7 Remote',
      body: 'UK fintech building a rewards wallet and BNPL access for credit-invisible consumers.',
      bullets: [
        'Built the marketing landing pages; now building the React Native mobile app for the wallet, working remotely with the UK team.',
      ],
    },
    {
      name: 'Pita',
      sub: 'Restaurant Kiosk + Kitchen Display System',
      stack: ['React', 'NX Monorepo', 'WebSockets', 'Docker', 'TypeScript'],
      period: '2024 — 2025',
      role: 'Architect & Lead Frontend',
      featured: true,
      international: 'Canada \u00B7 Remote',
      body: 'Built remotely in English with a Canadian client\u2019s team: a two-app React/NX monorepo for self-service restaurant ordering: a customer-facing kiosk and a kitchen display, sharing @pita/api and @pita/ui libraries and deployed as separate Docker images behind nginx routing.',
      bullets: [
        'Integrated Epson ePOS SDK for thermal receipt printing with automatic network → USB fallback — probes configured IP first, then scans localhost proxy ports for USB printers, with mobile-device and browser-print fallbacks.',
        'Real-time order sync between kiosk and kitchen via Laravel Echo + Pusher WebSockets, with a 10-second polling safety net and a live KDS board showing in-process vs ready orders.',
        'Zero-downtime version checker for always-on kiosk hardware — polls /version.json with cache-busting every 5 minutes and forces a hard reload on a new build, so kiosks never run stale code without manual intervention.',
      ],
    },
    {
      name: 'RexRx',
      sub: 'Online prescription pharmacy PWA',
      stack: ['Angular 17', 'PWA', 'Signals', 'Service Worker'],
      period: '2024',
      role: 'Front-End Developer',
      featured: true,
      international: 'Canada \u00B7 Remote',
      body: 'Front-end for a Canadian online pharmacy for GLP-1 weight-loss treatments (Ozempic, Wegovy, Mounjaro): a full Angular 17 PWA with a server-driven adaptive questionnaire engine and offline support.',
      bullets: [
        'Server-driven adaptive medical questionnaire (SingleChoice / MultipleChoice / FormFill / Terminate) — each question fetched dynamically from the API based on the previous answer, enabling personalised eligibility screening.',
        'Signal-based session management replacing BehaviorSubject, CAPTCHA-protected auth, multi-step drug selection & checkout, in-app order support chat, and Service Worker for offline use.',
      ],
    },
    {
      name: 'Talent Academy',
      sub: 'Interactive video learning platform',
      stack: ['Vue', 'Custom video player', 'SSO'],
      period: '2021',
      role: 'Frontend Developer',
      body: 'Custom interactive video player with playlists, Instagram-live-style instructor praise and improve messages, plus global SSO for internal platforms.',
    },
    {
      name: 'Majid',
      sub: 'Online form builder (confidential)',
      stack: ['Angular', 'Complex JSON'],
      period: '2020',
      role: 'Frontend Developer',
      body: 'Drag-and-drop form builder along the lines of JotForm — schema-driven UI with deep nested JSON handling and live preview.',
    },
  ];

  get featuredProjects(): Project[] { return this.projects.filter(p => p.featured); }
  get otherProjects(): Project[] { return this.projects.filter(p => !p.featured); }

  isReactTag(s: string): boolean { return s.toLowerCase().includes('react'); }

  highlights: Highlight[] = [
    {
      tag: 'Full-Stack',
      title: 'XPCard — a production platform built solo from scratch',
      body: 'Spring Boot modular monolith on MySQL, MongoDB and Redis, 27 contract-first OpenAPI specs, Angular storefront and admin apps, and a Dockerized production stack — designed, built and run by one engineer in about three months.',
    },
    {
      tag: 'AI / Workflow',
      title: 'A multi-agent delivery pipeline with human-owned architecture',
      body: 'PM, architect, dev, QA and review agents built on Claude Code, working against written acceptance criteria and quality gates I defined. Architecture, API contracts and every production merge stay with me.',
    },
    {
      tag: 'Ownership',
      title: 'Front-end owner of Digipay\u2019s payment product',
      body: 'Owned the entire Credit & BNPL front-end for 4+ years, and since Jul 2026 the payment (checkout) product \u2014 setting technical direction, reviewing code and mentoring engineers while still shipping hands-on, on flows 10M+ people use to borrow and pay.',
    },
    {
      tag: 'Migration',
      title: 'Merging two live payment apps into one',
      body: '~840 TypeScript files moved without source edits, every published URL kept working, both versions ran side by side behind nginx, then a production cutover with no user-facing regressions.',
    },
    {
      tag: 'AI / Team',
      title: 'Claude Code across Digipay\u2019s front-end',
      body: 'Figma-MCP dev, QA and design-review agents, AI code review for merge requests, and test-writing commands I wrote \u2014 a full test spec went from 1 day to under 1 hour.',
    },
    {
      tag: 'Architecture',
      title: 'Monorepo consolidation — 3 apps into 1 NX workspace',
      body: 'Unified three standalone Angular apps into a single NX monorepo with shared libs, consolidating dependencies and unlocking cross-app code reuse \u2014 later upgraded from Angular 17 to 22.',
    },
    {
      tag: 'AI / Tooling',
      title: 'Claude AI-assisted test generation pipeline',
      body: 'Designed a 900-line reusable prompt specification encoding testing principles and Angular patterns — generates test scaffolds across 75 packages with one repeatable workflow.',
    },
    {
      tag: 'State',
      title: '7-step credit pre-registration state machine',
      body: 'Conditional step-skipping, BehaviorSubject-driven reactive state, bidirectional URL ↔ step sync. Resilient to refresh, deep-linking, and partial completion.',
    },
  ];

  contactLinks: ContactLink[] = [
    { label: 'Email', value: 'iman.fa88@gmail.com', href: 'mailto:iman.fa88@gmail.com' },
    { label: 'LinkedIn', value: '@imanamini78', href: 'https://linkedin.com/in/imanamini78' },
    { label: 'GitHub', value: '@imanamini', href: 'https://github.com/imanamini' },
    { label: 'Web', value: 'imanamini.ir', href: 'https://imanamini.ir' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => this.scrolled.set(window.scrollY > 20), { passive: true });
    }
  }

  toggleTheme(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  toggleExpanded(i: number): void {
    this.expanded.update(e => ({ ...e, [i]: !e[i] }));
  }

  isExpanded(i: number): boolean {
    return !!this.expanded()[i];
  }

  onNameClick(): void {
    // When logged in the name keeps its resume-print easter egg (5 clicks).
    if (this.auth.isLoggedIn()) {
      this.print.registerNameClick(() => this.print.printAsPdf());
      return;
    }

    // When logged out, 10 rapid clicks reveal the hidden login page.
    this.loginClicks++;
    if (this.loginClickTimer) clearTimeout(this.loginClickTimer);

    if (this.loginClicks >= 10) {
      this.loginClicks = 0;
      this.router.navigate(['/login']);
      return;
    }

    this.loginClickTimer = setTimeout(() => (this.loginClicks = 0), 2000);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  goTo(route: string): void {
    this.menuOpen.set(false);
    this.router.navigate([route]);
  }

  async logout(): Promise<void> {
    this.menuOpen.set(false);
    await this.auth.logout();
  }

  pad(n: number): string {
    return String(n + 1).padStart(2, '0');
  }
}
