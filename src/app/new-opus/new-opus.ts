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

interface NavSection {
  id: string;
  label: string;
  index: string;
}
interface Stat {
  value: number;
  suffix: string;
  label: string;
}
interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
  highlights: string[];
  more: string[];
}
interface WorkCard {
  index: string;
  kind: string;
  title: string;
  body: string;
  tech: string;
}
interface SkillBar {
  name: string;
  level: number;
  note: string;
}
interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-new-opus',
  templateUrl: './new-opus.html',
  styleUrl: './new-opus.scss',
})
export class NewOpusComponent implements AfterViewInit, OnDestroy {
  r = RESUME;
  private print = inject(PrintService);
  private host = inject(ElementRef<HTMLElement>);

  @HostBinding('attr.data-theme') get themeAttr() {
    return this.theme();
  }

  theme = signal<'noir' | 'lumen'>('noir');
  progress = signal(0);
  activeSection = signal('intro');
  scrolled = signal(false);
  expanded = signal<Record<number, boolean>>({});
  rotatorIndex = signal(0);
  reducedMotion = false;

  rotatorWords = [
    'fintech at scale',
    'design systems',
    'monorepo architecture',
    'gesture physics',
    'AI-assisted testing',
  ];

  sections: NavSection[] = [
    { id: 'intro', label: 'Intro', index: '01' },
    { id: 'experience', label: 'Experience', index: '02' },
    { id: 'work', label: 'Selected Work', index: '03' },
    { id: 'stack', label: 'Toolkit', index: '04' },
    { id: 'background', label: 'Background', index: '05' },
    { id: 'contact', label: 'Contact', index: '06' },
  ];

  ticker = RESUME.skills;

  stats: Stat[] = [
    { value: 10, suffix: 'M+', label: 'users on Credit & BNPL flows' },
    { value: 14, suffix: '', label: 'shared npm packages shipped' },
    { value: 75, suffix: '', label: 'packages in one NX monorepo' },
    { value: 5, suffix: '+', label: 'years of fintech frontend' },
  ];

  jobs: Job[] = [
    {
      company: 'Digipay',
      role: 'Senior Front-End Engineer',
      period: 'Dec 2021 — Present',
      location: 'Tehran',
      summary:
        'Leading frontend for the Credit & BNPL product lines at Iran’s largest digital-payment platform.',
      tags: ['Angular', 'TypeScript', 'NX', 'RxJS', 'Playwright'],
      highlights: [
        'Led frontend for Credit & BNPL journeys serving 10M+ users — complex multi-step financial flows in Angular and TypeScript.',
        'Architected and published 14 shared npm packages, cutting cross-team duplication and accelerating delivery across every product line.',
        'Lead the Credit & BNPL frontend team — mentoring engineers and setting technical direction.',
      ],
      more: [
        'Migrated three standalone Angular apps into a unified NX monorepo with shared libs, consolidating dependencies and enabling cross-app code reuse.',
        'Established a multi-layer testing strategy across 75 packages: Karma/Jasmine unit tests, Playwright E2E, and a dual snapshot system (style + visual) as backward-compatibility guards.',
        'Engineered a 7-step credit pre-registration state machine with conditional step-skipping, BehaviorSubject-driven reactive state, and bidirectional URL ↔ step sync.',
        'Built zero-dependency pinch-to-zoom, pan and double-tap gesture directives — multi-touch distance math, boundary-constrained transforms and a rAF-throttled magnifier with rotation-aware mapping.',
        'Designed a Claude AI-assisted test-generation pipeline for 75 Angular packages — a 900-line reusable prompt spec encoding testing principles and Angular patterns.',
        'Adopted Angular 17+ standalone components, OnPush change detection and signal-based computed state across the Credit/BNPL library.',
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
      highlights: [
        'Developed internal panels for marketing, accounting and other departments with Vue/Nuxt.',
        'Researched and rolled out an agile process together with the product team.',
        'Mentored a front-end developer intern.',
      ],
      more: [],
    },
    {
      company: 'Carnotic',
      role: 'Front-End Developer',
      period: 'Oct 2019 — Dec 2021',
      location: 'Tehran',
      summary: 'Freight-forwarding platform with an SEO-first architecture.',
      tags: ['Nuxt', 'SEO'],
      highlights: [
        'Built a responsive freight-forwarding platform with pixel-perfect implementations.',
        'Implemented a Nuxt.js app for SEO optimization.',
        'Documented components and wrote test cases for all methods.',
      ],
      more: [],
    },
  ];

  work: WorkCard[] = [
    {
      index: '01',
      kind: 'AI · Tooling',
      title: 'Claude-assisted test generation for 75 packages',
      body: 'A 900-line reusable prompt specification encoding testing principles and Angular patterns — one repeatable workflow that scaffolds tests across the entire monorepo.',
      tech: 'Claude · TypeScript · CLI',
    },
    {
      index: '02',
      kind: 'Architecture',
      title: 'Three apps, one NX workspace',
      body: 'Unified three standalone Angular apps into a single monorepo with shared libraries — consolidated dependencies and unlocked cross-app reuse.',
      tech: 'NX · Angular',
    },
    {
      index: '03',
      kind: 'UX · Low-level',
      title: 'Zero-dependency gesture system',
      body: 'Pinch-to-zoom, pan and double-tap built from raw touch events: multi-touch distance math, boundary-constrained transforms and a rAF-throttled magnifier with rotation-aware mapping.',
      tech: 'Angular Directives · Canvas',
    },
    {
      index: '04',
      kind: 'State',
      title: '7-step credit state machine',
      body: 'Conditional step-skipping, reactive BehaviorSubject state and bidirectional URL ↔ step sync. Survives refresh, deep links and partial completion without losing the user.',
      tech: 'RxJS · Angular Router',
    },
    {
      index: '05',
      kind: 'PWA',
      title: 'Pharma — prescription e-commerce',
      body: 'A full Angular 17 PWA with signal-based session management, multi-step checkout, in-app support chat and offline capability.',
      tech: 'Angular 17 · Service Worker',
    },
  ];

  skillBars: SkillBar[] = [
    { name: 'Angular', level: 96, note: '5+ yrs · daily driver' },
    { name: 'TypeScript', level: 94, note: '5+ yrs' },
    { name: 'RxJS', level: 90, note: 'reactive state at scale' },
    { name: 'NX Monorepo', level: 85, note: '75-package workspace' },
    { name: 'React / Next.js', level: 80, note: 'production apps' },
    { name: 'Vue / Nuxt', level: 78, note: 'SSR & SEO' },
    { name: 'Testing (Playwright · Karma)', level: 82, note: 'multi-layer strategy' },
  ];

  proficient = ['React', 'Next.js', 'Vue', 'Nuxt', 'Playwright', 'Karma/Jasmine', 'SCSS/CSS'];
  familiar = ['Git', 'REST APIs', 'Figma', 'Agile/Scrum'];

  contactLinks: ContactLink[] = [
    {
      label: 'Email',
      value: 'iman.fa88@gmail.com',
      href: 'mailto:iman.fa88@gmail.com',
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      value: 'in/imanamini78',
      href: 'https://linkedin.com/in/imanamini78',
      icon: 'link',
    },
    { label: 'GitHub', value: '@imanamini', href: 'https://github.com/imanamini', icon: 'git' },
    { label: 'Website', value: 'imanamini.ir', href: 'https://imanamini.ir', icon: 'globe' },
  ];

  private observers: IntersectionObserver[] = [];
  private rotatorTimer: ReturnType<typeof setInterval> | null = null;
  private rafScroll = 0;
  private rafCursor = 0;
  private cursorX = 0;
  private cursorY = 0;
  private ringX = 0;
  private ringY = 0;
  private cursorEl: HTMLElement | null = null;
  private cursorActive = false;

  private onScroll = () => {
    if (this.rafScroll) return;
    this.rafScroll = requestAnimationFrame(() => {
      this.rafScroll = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      this.progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      this.scrolled.set(window.scrollY > 24);
      const root: HTMLElement = this.host.nativeElement;
      const aurora = root.querySelector<HTMLElement>('.aurora');
      if (aurora) aurora.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
    });
  };

  private onMouseMove = (e: MouseEvent) => {
    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
    const root: HTMLElement = this.host.nativeElement;
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
    if (!this.cursorActive) {
      this.cursorActive = true;
      root.classList.add('cursor-on');
    }
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.addEventListener('scroll', this.onScroll, { passive: true });
      if (!this.reducedMotion) {
        this.rotatorTimer = setInterval(() => {
          this.rotatorIndex.update((i) => (i + 1) % this.rotatorWords.length);
        }, 2400);
      }
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const root: HTMLElement = this.host.nativeElement;

    // Reveal-on-scroll
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            reveal.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 },
    );
    root.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));
    this.observers.push(reveal);

    // Section spy
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) this.activeSection.set(e.target.id);
        }
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    this.sections.forEach((s) => {
      const el = root.querySelector(`#${s.id}`);
      if (el) spy.observe(el);
    });
    this.observers.push(spy);

    // Animated counters
    const counters = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            this.animateCount(e.target as HTMLElement);
            counters.unobserve(e.target);
          }
        }
      },
      { threshold: 0.5 },
    );
    root.querySelectorAll('[data-count]').forEach((el) => counters.observe(el));
    this.observers.push(counters);

    // Skill bars
    const bars = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-filled');
            bars.unobserve(e.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    root.querySelectorAll('.bar').forEach((el) => bars.observe(el));
    this.observers.push(bars);

    // Custom cursor (desktop, motion-friendly only)
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine && !this.reducedMotion) {
      this.cursorEl = root.querySelector<HTMLElement>('.cursor');
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      this.loopCursor();
    }
  }

  private loopCursor = () => {
    this.ringX += (this.cursorX - this.ringX) * 0.16;
    this.ringY += (this.cursorY - this.ringY) * 0.16;
    if (this.cursorEl) {
      this.cursorEl.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    }
    this.rafCursor = requestAnimationFrame(this.loopCursor);
  };

  private animateCount(el: HTMLElement): void {
    const target = Number(el.dataset['count'] || '0');
    if (this.reducedMotion) {
      el.textContent = String(target);
      return;
    }
    const dur = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('mousemove', this.onMouseMove);
    }
    this.observers.forEach((o) => o.disconnect());
    if (this.rotatorTimer) clearInterval(this.rotatorTimer);
    if (this.rafScroll) cancelAnimationFrame(this.rafScroll);
    if (this.rafCursor) cancelAnimationFrame(this.rafCursor);
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === 'noir' ? 'lumen' : 'noir'));
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

  scrollWork(dir: number): void {
    const root: HTMLElement = this.host.nativeElement;
    const track = root.querySelector<HTMLElement>('.work__track');
    if (!track) return;
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 520), behavior: 'smooth' });
  }
}
