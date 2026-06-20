import { Component, HostBinding, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';

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
  body: string;
  bullets?: string[];
}

@Component({
  selector: 'app-portfolio-v2',
  imports: [NgFor, NgIf],
  templateUrl: './portfolio-v2.html',
  styleUrl: './portfolio-v2.scss',
})
export class PortfolioV2Component {
  r = RESUME;
  private print = inject(PrintService);

  @HostBinding('attr.data-theme') get themeAttr() { return this.theme(); }

  theme = signal<'dark' | 'light'>('dark');
  scrolled = signal(false);
  expanded = signal<Record<number, boolean>>({ 0: true });

  firstName = 'Iman';
  lastName = 'Amini';
  role = 'Frontend Engineer';
  availability = 'Remote \u00B7 Hybrid \u00B7 On-site';

  stats = [
    { value: '5+', label: 'Years shipping fintech frontend' },
    { value: 'Lead', label: 'Credit & BNPL frontend team' },
    { value: '10M+', label: 'Users on flows I own' },
    { value: '14', label: 'Shared npm packages published' },
  ];

  experiences = [
    {
      company: 'Digipay',
      role: 'Senior Front-End Engineer',
      period: 'Dec 2021 — Present',
      location: 'Tehran',
      summary: 'Lead frontend on Credit & BNPL product lines at Iran\u2019s largest digital-payment platform.',
      tags: ['Angular', 'TypeScript', 'NX Monorepo', 'RxJS'],
      featured: [
        'Led frontend for Credit & BNPL journeys serving 10M+ users — complex multi-step financial flows in Angular + TypeScript.',
        'Architected and published 14 shared npm packages, reducing cross-team code duplication and accelerating delivery across all product lines.',
        'Leading the Credit & BNPL line, mentoring engineers and setting the technical direction.',
      ],
      bullets: [
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
      backendBullets: [
        'Instrumented Credit Onboarding Java (Spring Boot) service with Micrometer metrics end-to-end — covering SMC scoring, ICS OTP, BNPL inquiry/allocation, campaign wallet, sequential and volunteer flows.',
        'Fixed production Java bugs: NullPointerException in blocking-detail service, journal double-linking on duplicate trackingCodes, and BNPL SMS double-activation — each with unit test coverage.',
        'Implemented configurable time-window scoring-provider switch in SMC Java service (ICS ↔ BANK_SCORE).',
        'Built Credit Club (Mellat & Tejarat) and Installment Cheque landing pages in PHP, integrating credit-installment REST APIs.',
      ],
    },
    {
      company: 'Adowing',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran',
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
      location: 'Tehran',
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
  stackSecondary = ['RxJS', 'Vue', 'Nuxt', 'Playwright', 'Karma/Jasmine', 'SCSS / Tailwind', 'PWA / Service Workers'];
  stackBackend = ['Java / Spring Boot', 'PHP'];
  stackFamiliar = ['WebSockets', 'Pusher', 'Laravel Echo', 'Docker', 'Git', 'REST APIs', 'Figma', 'Agile/Scrum'];

  projects: Project[] = [
    {
      name: 'Pita',
      sub: 'Restaurant Kiosk + Kitchen Display System',
      stack: ['React', 'NX Monorepo', 'WebSockets', 'Docker', 'TypeScript'],
      period: '2024 — 2025',
      role: 'Architect & Lead Frontend',
      featured: true,
      body: 'Two-app React/NX monorepo for self-service restaurant ordering: a customer-facing kiosk and a kitchen display, sharing @pita/api and @pita/ui libraries and deployed as separate Docker images behind nginx routing.',
      bullets: [
        'Integrated Epson ePOS SDK for thermal receipt printing with automatic network → USB fallback — probes configured IP first, then scans localhost proxy ports for USB printers, with mobile-device and browser-print fallbacks.',
        'Real-time order sync between kiosk and kitchen via Laravel Echo + Pusher WebSockets, with a 10-second polling safety net and a live KDS board showing in-process vs ready orders.',
        'Zero-downtime version checker for always-on kiosk hardware — polls /version.json with cache-busting every 5 minutes and forces a hard reload on a new build, so kiosks never run stale code without manual intervention.',
      ],
    },
    {
      name: 'Pharma',
      sub: 'Prescription Drug E-commerce PWA',
      stack: ['Angular 17', 'PWA', 'Signals', 'Service Worker'],
      period: '2024',
      role: 'Frontend Engineer',
      featured: true,
      body: 'Full Angular 17 PWA for prescription pharmaceutical e-commerce with a server-driven adaptive questionnaire engine and offline support.',
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
      tag: 'Leadership',
      title: 'Leading the Credit & BNPL frontend line',
      body: 'Setting technical direction, running code reviews, mentoring engineers, and unblocking cross-team work — while still shipping hands-on. Owning a product line that 10M+ people depend on to borrow and pay.',
    },
    {
      tag: 'Architecture',
      title: 'Monorepo consolidation — 3 apps into 1 NX workspace',
      body: 'Unified three standalone Angular apps into a single NX monorepo with shared libs, consolidating dependencies and unlocking cross-app code reuse across 75 packages.',
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
    this.print.registerNameClick(() => this.print.printAsPdf());
  }

  pad(n: number): string {
    return String(n + 1).padStart(2, '0');
  }
}
