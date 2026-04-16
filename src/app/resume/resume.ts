import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

interface Project {
  name: string;
  tech: string;
  period: string;
  bullets: string[];
}

interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

interface Course {
  name: string;
  provider: string;
  year?: string;
}

@Component({
  selector: 'app-resume',
  imports: [NgFor],
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class ResumeComponent {
  name = 'Iman Amini';
  title = 'Senior Front-End Engineer';
  email = 'iman.fa88@gmail.com';
  phone = '+98-9034646366';
  linkedinUrl = 'https://www.linkedin.com/in/imanamini78';

  summary = 'Senior Frontend Engineer with 5+ years of experience in fintech, specializing in Angular and TypeScript at scale. Led development of Credit & BNPL flows serving 10M+ users at Iran\'s largest digital payment platform. Architected 14 shared NPM packages and established multi-layer testing strategies across NPM 75-packages. Experienced with React/Next.js, Vue/Nuxt, and NX monorepo architectures.';

  experiences: Experience[] = [
    {
      company: 'Digipay',
      location: 'Tehran',
      role: 'Senior Front-End Engineer',
      period: 'Dec 2021 – Present',
      bullets: [
        'Led frontend development of Credit & BNPL journey serving +10M users, implementing complex multi-step financial flows with Angular and TypeScript.',
        'Architected and published 14 internal npm packages, reducing cross-team code duplication and improving delivery speed across multiple product lines.',
        'Leading Credit & BNPL line front developers.',
        'Migrated three standalone Angular applications (web-wallet, credit, merchant-credit) into a unified NX monorepo with shared libs/ structure, consolidating dependencies and enabling cross-app code reuse.',
        'Established a multi-layer testing strategy across 75 shared npm packages: Karma/Jasmine unit tests for signal-based component logic and OnPush behavioral contracts, Playwright E2E tests for computed CSS, animation, and input-variant contracts, and a dual snapshot system (style .txt + visual .png) as backward-compatibility guards.',
        'Engineered a 7-step credit pre-registration state machine with conditional step-skipping logic, BehaviorSubject-driven reactive state, dynamic plan filtering by fund provider and collateral type, and bidirectional URL–step synchronization via query parameters.',
        'Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives for document image inspection, implementing multi-touch distance calculation, boundary-constrained CSS transforms, and requestAnimationFrame-throttled magnifier with rotation-aware coordinate mapping.',
        'Designed a Claude AI–assisted test generation pipeline for a 75-package Angular component library, engineering a 900-line reusable prompt specification that encodes testing principles, Angular signal patterns, OnPush behavioral contracts, and Playwright pitfalls.',
        'Adopted Angular 17 standalone components, OnPush change detection, and signal-based computed properties across the entire Credit/BNPL library, eliminating NgModule overhead.',
        'Implemented a custom Angular preloading strategy using route metadata (preload: true, critical: true) to load critical routes immediately post-bootstrap, alongside retryImport wrappers for network-resilient lazy module loading.',
        'Integrated multi-platform analytics (Google Tag Manager, InTrack, Sentry) behind a single EventManagementService abstraction, with Sentry configured for performance profiling and console-error capture.',
        'Built a zero-maintenance test catalog CLI (generate-package-status.mjs) that auto-discovers unit and E2E specs across all 75 packages, counts individual test cases via regex, and generates a typed TypeScript data file powering a live status dashboard.',
        'Developed digital sign feature capturing selfie video and photo.',
        'Developed Mydigipay website by Laravel & Angular.',
      ]
    },
    {
      company: 'Adowing',
      location: 'Tehran',
      role: 'Front-End Developer',
      period: 'Oct 2019 – Dec 2021',
      bullets: [
        'Developed internal panels for the marketing team, accounting team & other departments.',
        'Built pixel-perfect in different sizes according to the design.',
        'Researched the agile approach with the product team and implemented it.',
        'Researched test methods like unit test, integration test, regression test & acceptance test.',
        'Researched clean code methods and developed products with them.',
        'Mentored a front-end developer intern.',
      ]
    },
    {
      company: 'Carnotic',
      location: 'Tehran',
      role: 'Front-End Developer',
      period: 'Oct 2019 – Dec 2021',
      bullets: [
        'Implemented a highly responsive user interface for a freight forwarding platform.',
        'Built pixel-perfect in different sizes according to the design.',
        'Packed customized video player from "Talent academy" project and used in Carnotic.',
        'Implemented this Nuxt app for SEO purposes.',
        'Documented components and wrote test cases for all methods.',
      ]
    },
    {
      company: 'Freelance',
      location: 'Tehran',
      role: 'Android Developer',
      period: 'Oct 2014 – Oct 2015',
      bullets: [
        'Developed 10 apps and published them in Cafebazaar, Myket and Candoo.',
        'Implemented with B4A (Basic for Android) that is based on VisualBasic language.',
        'All applications were content-driven.',
      ]
    }
  ];

  projects: Project[] = [
    {
      name: 'Pita-front',
      tech: 'NX Monorepo · React · Restaurant Kiosk + Kitchen Display',
      period: 'Jan 2021 – Jun 2021',
      bullets: [
        'Architected an NX monorepo with two independent React apps (customer self-service kiosk + kitchen staff display) sharing @pita/api and @pita/ui libraries, deployed via separate Docker images with nginx routing per app.',
        'Integrated Epson ePOS SDK for thermal receipt printing with automatic network→USB fallback: probes configured network IP first, then discovers USB printers by scanning localhost proxy ports, with mobile-device and browser-print fallbacks.',
        'Implemented real-time order synchronization between kiosk and kitchen using Laravel Echo + Pusher WebSockets, with a 10-second polling safety net and a live KDS board showing in-process vs ready orders.',
        'Engineered a zero-downtime version checker service for always-on kiosk hardware that polls /version.json with cache-busting headers every 5 minutes and forces a hard reload when a new build is detected.',
      ]
    },
    {
      name: 'Pharma',
      tech: 'Angular 17 PWA · Prescription Drug E-commerce',
      period: 'Jan 2021 – Jun 2021',
      bullets: [
        'Developed a server-driven adaptive medical questionnaire engine supporting 4 question types (SingleChoice, MultipleChoice, FormFill, Terminate), where each question is dynamically fetched from the API based on the previous answer.',
        'Built a full Angular 17 PWA for prescription pharmaceutical e-commerce with signal-based session management, CAPTCHA-protected authentication, multi-step drug selection/checkout flow, in-app order support chat, and Service Worker for offline capability.',
      ]
    },
    {
      name: 'Talent Academy',
      tech: 'Front-End Developer',
      period: 'Jan 2021 – Jun 2021',
      bullets: [
        'Created an interactive video player with features such as playlist, sending improvement messages & praising instructors like Instagram live.',
        'Developed global authentication login for all internal platforms.',
      ]
    },
    {
      name: 'Majid (confidential)',
      tech: 'Front-End Developer',
      period: 'Apr 2020 – Mar 2021',
      bullets: [
        'Developed a full-featured online form builder that makes it easy to create robust forms and collect important data.',
        'Worked with complex JSON for project purposes.',
        'This product is similar to the Jotform platform.',
      ]
    }
  ];

  education: Education[] = [
    {
      institution: 'Islamic Azad University Central Tehran Branch',
      location: 'Tehran',
      degree: 'Computer Engineering — Bachelor',
      period: '2017 – 2022'
    },
    {
      institution: 'Imam Sadiq Highschool',
      location: 'Tehran',
      degree: 'Mathematics and Physics — Diploma',
      period: '2013 – 2017'
    }
  ];

  courses: Course[] = [
    { name: 'Claude Code in Action', provider: 'Anthropic', year: 'Feb 2026' },
    { name: 'The Complete Guide to Becoming a Software Architect', provider: 'Udemy', year: 'Apr 2025' },
    { name: 'Angular — The Complete Guide (2024 Edition)', provider: 'Udemy' },
    { name: 'UTACM-Cafebazaar Android Course', provider: 'Cafebazaar & University of Tehran', year: 'Winter 2019' },
    { name: 'Agile Software Development: Clean Coding Practices', provider: 'LinkedIn' },
    { name: 'Agile Software Development: Refactoring', provider: 'LinkedIn' },
    { name: 'JavaScript: Classes', provider: 'LinkedIn' },
    { name: 'Test Automation Foundations', provider: 'LinkedIn' },
    { name: 'Agile Testing', provider: 'LinkedIn' },
    { name: 'Bootstrap 4 with Sass', provider: 'LinkedIn' },
    { name: 'Interactive Animations with CSS and JavaScript', provider: 'LinkedIn' },
    { name: 'JavaScript for Web Designers', provider: 'LinkedIn' },
  ];
}
