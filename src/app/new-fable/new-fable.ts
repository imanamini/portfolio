import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { RESUME } from '../data/resume-data';
import { PrintService } from '../data/print.service';

interface RailSection {
  id: string;
  label: string;
}
interface Stat {
  value: string;
  label: string;
}
interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
  featured: string[];
  archive: string[];
}
interface CaseStudy {
  tag: string;
  title: string;
  body: string;
  span: 'wide' | 'narrow';
}
interface CoreSkill {
  name: string;
  years: number;
}
interface ContactLink {
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-new-fable',
  templateUrl: './new-fable.html',
  styleUrl: './new-fable.scss',
})
export class NewFableComponent implements AfterViewInit, OnDestroy {
  r = RESUME;
  private print = inject(PrintService);
  private host = inject(ElementRef<HTMLElement>);

  @HostBinding('attr.data-theme') get themeAttr() {
    return this.theme();
  }

  theme = signal<'paper' | 'ink'>('paper');
  progress = signal(0);
  scrolled = signal(false);
  activeSection = signal('intro');
  expanded = signal<Record<number, boolean>>({});
  rotatorIndex = signal(0);

  rotatorWords = [
    'fintech flows',
    'design systems',
    '75-package monorepos',
    'testing pipelines',
    'gesture physics',
  ];

  sections: RailSection[] = [
    { id: 'intro', label: 'Intro' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Selected work' },
    { id: 'stack', label: 'Toolkit' },
    { id: 'background', label: 'Background' },
    { id: 'contact', label: 'Contact' },
  ];

  tickerItems = RESUME.skills;

  stats: Stat[] = [
    { value: '10M+', label: 'users on Credit & BNPL flows' },
    { value: '14', label: 'shared npm packages published' },
    { value: '75', label: 'packages in one NX monorepo' },
    { value: '5+', label: 'years of fintech frontend' },
  ];

  jobs: Job[] = [
    {
      company: 'Digipay',
      role: 'Senior Front-End Engineer',
      period: 'Dec 2021 — Present',
      location: 'Tehran',
      summary:
        'Leading frontend for the Credit & BNPL product lines at Iran’s largest digital-payment platform.',
      tags: ['Angular', 'TypeScript', 'NX', 'RxJS'],
      featured: [
        'Led frontend for Credit & BNPL journeys serving 10M+ users — complex multi-step financial flows in Angular and TypeScript.',
        'Architected and published 14 shared npm packages, cutting cross-team duplication and accelerating delivery across every product line.',
        'Lead the Credit & BNPL frontend team — mentoring engineers and setting technical direction.',
      ],
      archive: [
        'Migrated three standalone Angular apps into a unified NX monorepo with shared libs, consolidating dependencies and enabling cross-app code reuse.',
        'Established a multi-layer testing strategy across 75 packages: Karma/Jasmine unit tests, Playwright E2E, and a dual snapshot system (style + visual) as backward-compatibility guards.',
        'Engineered a 7-step credit pre-registration state machine with conditional step-skipping, BehaviorSubject-driven reactive state, and bidirectional URL ↔ step sync.',
        'Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives for document inspection — multi-touch distance math, boundary-constrained transforms, and a rAF-throttled magnifier with rotation-aware coordinate mapping.',
        'Implemented a custom Angular preloading strategy driven by route metadata, with retryImport wrappers for network-resilient lazy loading.',
        'Designed a Claude AI-assisted test-generation pipeline for 75 Angular packages — a 900-line reusable prompt spec encoding testing principles and Angular patterns.',
        'Built a zero-maintenance test catalog CLI that auto-discovers specs across all 75 packages and generates a typed data file powering a live status dashboard.',
        'Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed state across the Credit/BNPL library.',
        'Built a biometric identity-verification feature with selfie-video capture and liveness photo for digital document signing.',
      ],
    },
    {
      company: 'Adowing',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran',
      summary: 'Internal tooling for marketing, accounting and operations teams.',
      tags: ['Vue', 'Nuxt', 'Agile'],
      featured: [
        'Developed internal panels for marketing, accounting and other departments with Vue/Nuxt.',
        'Researched and rolled out an agile process together with the product team.',
        'Mentored a front-end developer intern.',
      ],
      archive: [],
    },
    {
      company: 'Carnotic',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran',
      summary: 'Freight-forwarding platform with an SEO-first architecture.',
      tags: ['Nuxt', 'SEO'],
      featured: [
        'Built a responsive freight-forwarding platform with pixel-perfect implementations.',
        'Implemented a Nuxt.js app for SEO optimization.',
        'Documented components and wrote test cases for all methods.',
      ],
      archive: [],
    },
  ];

  caseStudies: CaseStudy[] = [
    {
      tag: 'AI / Tooling',
      title: 'Claude-assisted test generation for 75 packages',
      body: 'A 900-line reusable prompt specification encoding testing principles and Angular patterns — one repeatable workflow that scaffolds tests across the entire monorepo.',
      span: 'wide',
    },
    {
      tag: 'Architecture',
      title: '3 apps, 1 NX workspace',
      body: 'Unified three standalone Angular apps into a single monorepo with shared libs — consolidated dependencies, unlocked cross-app reuse.',
      span: 'narrow',
    },
    {
      tag: 'UX / Low-level',
      title: 'Zero-dependency gesture system',
      body: 'Pinch-to-zoom, pan and double-tap built from raw touch events: multi-touch distance math, boundary-constrained transforms, a rAF-throttled magnifier with rotation-aware mapping.',
      span: 'narrow',
    },
    {
      tag: 'State',
      title: '7-step credit state machine',
      body: 'Conditional step-skipping, reactive BehaviorSubject state, bidirectional URL ↔ step sync. Survives refresh, deep links and partial completion without losing the user.',
      span: 'wide',
    },
  ];

  coreSkills: CoreSkill[] = [
    { name: 'Angular', years: 5 },
    { name: 'TypeScript', years: 5 },
    { name: 'RxJS', years: 5 },
    { name: 'NX Monorepo', years: 3 },
  ];
  proficient = ['React', 'Next.js', 'Vue', 'Nuxt', 'Playwright', 'Karma/Jasmine', 'SCSS/CSS'];
  familiar = ['Git', 'REST APIs', 'Figma', 'Agile/Scrum'];

  contactLinks: ContactLink[] = [
    { label: 'Email', value: 'iman.fa88@gmail.com', href: 'mailto:iman.fa88@gmail.com' },
    { label: 'LinkedIn', value: 'in/imanamini78', href: 'https://linkedin.com/in/imanamini78' },
    { label: 'GitHub', value: '@imanamini', href: 'https://github.com/imanamini' },
    { label: 'Website', value: 'imanamini.ir', href: 'https://imanamini.ir' },
  ];

  private observers: IntersectionObserver[] = [];
  private rotatorTimer: ReturnType<typeof setInterval> | null = null;
  private onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    this.scrolled.set(window.scrollY > 24);
  };

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        this.rotatorTimer = setInterval(() => {
          this.rotatorIndex.update((i) => (i + 1) % this.rotatorWords.length);
        }, 2600);
      }
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const root: HTMLElement = this.host.nativeElement;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            reveal.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    root.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
    this.observers.push(reveal);

    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.activeSection.set(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    this.sections.forEach((s) => {
      const el = root.querySelector(`#${s.id}`);
      if (el) spy.observe(el);
    });
    this.observers.push(spy);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') window.removeEventListener('scroll', this.onScroll);
    this.observers.forEach((o) => o.disconnect());
    if (this.rotatorTimer) clearInterval(this.rotatorTimer);
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === 'paper' ? 'ink' : 'paper'));
  }

  toggleExpanded(i: number): void {
    this.expanded.update((e) => ({ ...e, [i]: !e[i] }));
  }

  isExpanded(i: number): boolean {
    return !!this.expanded()[i];
  }

  onNameClick(): void {
    this.print.registerNameClick(() => this.print.printAsPdf());
  }

  no(n: number): string {
    return String(n + 1).padStart(2, '0');
  }
}
