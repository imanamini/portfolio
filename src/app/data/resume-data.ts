export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Project {
  name: string;
  tech: string;
  period: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Course {
  name: string;
  provider: string;
  year?: string;
}

export const RESUME = {
  name: 'Iman Amini',
  title: 'Senior Front-End Developer',
  email: 'iman.fa88@gmail.com',
  phone: '+98-9034646366',
  linkedinUrl: 'https://www.linkedin.com/in/imanamini78',

  summary:
    'Senior Frontend Engineer with 5+ years of experience in fintech, specializing in Angular and TypeScript at scale. ' +
    'Led development of Credit & BNPL flows serving 10M+ users at Iran\'s largest digital payment platform. ' +
    'Architected 14 shared npm packages and established multi-layer testing strategies across 75-package monorepos. ' +
    'Experienced with React/Next.js, Vue/Nuxt, and NX monorepo architectures.',

  skills: [
    'Angular', 'TypeScript', 'RxJS', 'NX Monorepo',
    'React', 'Next.js', 'Vue', 'Nuxt',
    'Playwright', 'Karma/Jasmine',
    'SCSS/CSS', 'Git', 'REST APIs',
    'Figma', 'Agile/Scrum',
  ],

  experiences: [
    {
      company: 'Digipay',
      location: 'Tehran',
      role: 'Senior Front-End Developer',
      period: 'Dec 2021 – Present',
      bullets: [
        'Led frontend development of Credit & BNPL journey serving 10M+ users, implementing complex multi-step financial flows with Angular and TypeScript.',
        'Architected and published 14 internal npm packages, reducing cross-team code duplication and improving delivery speed across multiple product lines.',
        'Leading Credit & BNPL line front-end developers.',
        'Migrated three standalone Angular apps into a unified NX monorepo with shared libs, consolidating dependencies and enabling cross-app code reuse.',
        'Established a multi-layer testing strategy across 75 packages: Karma/Jasmine unit tests, Playwright E2E tests, and a dual snapshot system (style + visual) as backward-compatibility guards.',
        'Engineered a 7-step credit pre-registration state machine with conditional step-skipping, BehaviorSubject-driven reactive state, and bidirectional URL–step synchronization.',
        'Designed a Claude AI–assisted test generation pipeline for 75 Angular packages, engineering a 900-line reusable prompt specification encoding testing principles and Angular patterns.',
        'Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed properties across the entire Credit/BNPL library.',
      ],
    },
    {
      company: 'Adowing',
      location: 'Tehran',
      role: 'Front-End Developer',
      period: 'Oct 2019 – Dec 2021',
      bullets: [
        'Developed internal panels for marketing, accounting & other departments using Vue/Nuxt.',
        'Researched and implemented agile approach with the product team.',
        'Mentored a front-end developer intern.',
      ],
    },
    {
      company: 'Carnotic',
      location: 'Tehran',
      role: 'Front-End Developer',
      period: 'Oct 2019 – Dec 2021',
      bullets: [
        'Built a responsive freight-forwarding platform with pixel-perfect implementations.',
        'Implemented a Nuxt.js app for SEO optimization.',
        'Documented components and wrote test cases for all methods.',
      ],
    },
  ] as Experience[],

  projects: [
    {
      name: 'Pita-front',
      tech: 'NX · React · Docker',
      period: '2021',
      bullets: [
        'Architected an NX monorepo with two React apps (customer kiosk + kitchen display) sharing @pita/api and @pita/ui libraries, deployed via separate Docker images.',
        'Implemented real-time order sync using Laravel Echo + Pusher WebSockets with polling fallback and a live Kitchen Display System board.',
      ],
    },
    {
      name: 'Pharma',
      tech: 'Angular 17 · PWA',
      period: '2021',
      bullets: [
        'Built a full Angular 17 PWA for prescription pharmaceutical e-commerce with signal-based session management, multi-step checkout, in-app support chat, and offline capability.',
      ],
    },
    {
      name: 'Talent Academy',
      tech: 'Vue · Video Player',
      period: '2021',
      bullets: [
        'Created an interactive video player with playlist, live feedback messaging, and global authentication for all internal platforms.',
      ],
    },
    {
      name: 'Majid',
      tech: 'Vue · Form Builder',
      period: '2020 – 2021',
      bullets: [
        'Developed a full-featured online form builder (similar to Jotform) with complex JSON-driven form generation.',
      ],
    },
  ] as Project[],

  education: [
    {
      institution: 'Islamic Azad University, Tehran',
      degree: 'B.Sc. Computer Engineering',
      period: '2017 – 2022',
    },
  ] as Education[],

  courses: [
    { name: 'Claude Code in Action', provider: 'Anthropic', year: '2026' },
    { name: 'The Complete Guide to Becoming a Software Architect', provider: 'Udemy', year: '2025' },
    { name: 'Angular — The Complete Guide', provider: 'Udemy', year: '2024' },
  ] as Course[],
};
