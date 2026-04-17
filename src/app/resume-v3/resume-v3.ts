import { Component, HostBinding, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';

interface StackPrimary { name: string; years: number; }
interface Highlight { tag: string; title: string; body: string; }
interface ContactLink { label: string; value: string; href: string; }

@Component({
  selector: 'app-resume-v3',
  imports: [NgFor, NgIf],
  templateUrl: './resume-v3.html',
  styleUrl: './resume-v3.scss',
})
export class ResumeV3Component {
  r = RESUME;
  private print = inject(PrintService);

  @HostBinding('attr.data-theme') get themeAttr() { return this.theme(); }

  theme = signal<'dark' | 'light'>('dark');
  scrolled = signal(false);
  expanded = signal<Record<number, boolean>>({ 0: true });

  stats = [
    { value: '10M+', label: 'Users on Credit & BNPL flows' },
    { value: '14', label: 'Shared npm packages published' },
    { value: '75', label: 'Packages in the monorepo' },
    { value: '5+', label: 'Years in fintech frontend' },
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
    },
    {
      company: 'Adowing',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Remote',
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
      location: 'Remote',
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
    { name: 'TypeScript', years: 5 },
    { name: 'RxJS', years: 5 },
    { name: 'NX Monorepo', years: 3 },
  ];
  stackSecondary = ['React', 'Next.js', 'Vue', 'Nuxt', 'Playwright', 'Karma/Jasmine', 'SCSS/CSS'];
  stackFamiliar = ['Git', 'REST APIs', 'Figma', 'Agile/Scrum'];

  highlights: Highlight[] = [
    {
      tag: 'AI / Tooling',
      title: 'Claude AI-assisted test generation pipeline',
      body: 'Designed a 900-line reusable prompt specification encoding testing principles and Angular patterns — generates test scaffolds across 75 packages with one repeatable workflow.',
    },
    {
      tag: 'Architecture',
      title: 'Monorepo consolidation — 3 apps into 1 NX workspace',
      body: 'Unified three standalone Angular apps into a single NX monorepo with shared libs, consolidating dependencies and unlocking cross-app code reuse.',
    },
    {
      tag: 'UX / Low-level',
      title: 'Zero-dependency pinch/zoom/pan gesture system',
      body: 'Multi-touch distance calc, boundary-constrained CSS transforms, rAF-throttled magnifier, rotation-aware coordinate mapping — built for document inspection in digital signing flows.',
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

  firstName = 'Iman';
  lastName = 'Amini';
  role = 'Senior Frontend Engineer';
  location = 'Tehran, Iran';

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
