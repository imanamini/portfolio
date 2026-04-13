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
  role: string;
  period: string;
  bullets: string[];
}

interface Education {
  institution: string;
  location: string;
  degree: string;
  period: string;
}

@Component({
  selector: 'app-resume',
  imports: [NgFor],
  templateUrl: './resume.html',
  styleUrl: './resume.scss'
})
export class ResumeComponent {
  name = 'Iman Amini';
  title = 'Front-End Developer';
  email = 'iman.fa88@gmail.com';
  phone = '+98-9034646366';
  linkedinUrl = 'https://www.linkedin.com/in/imanamini';

  skillsLeft = [
    'Fluent in Vue and Nuxt',
    'Fluent in Bootstrap',
    'Experienced with HTML, CSS, and JS',
    'Experienced with Git and Git Workflows',
    'Experienced with Rest APIs',
    'Experienced with jQuery',
    'Experienced with writing test cases',
  ];

  skillsRight = [
    'Familiar with Vuex',
    'Familiar with SASS',
    'Familiar with Adobe XD & Figma',
    'Familiar with Agile methods',
    'Familiar with Test frameworks (JEST)',
  ];

  experiences: Experience[] = [
    {
      company: 'Digipay',
      location: 'Tehran',
      role: 'Front-End Developer',
      period: 'Dec 2021 – Present',
      bullets: [
        'Developing Mydigipay website by blade framework.',
        'Built pixel-perfect in different sizes according to the design.',
        'Developing website by pure JS and not using any JS framework.',
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
      period: 'Oct 2019 – Present',
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
      name: 'Talent Academy',
      role: 'Front-End Developer',
      period: 'Jan 2021 – Jun 2021',
      bullets: [
        'Created an interactive video player with features such as playlist, sending improvement messages & praising instructors like Instagram live.',
        'Developed global authentication login for all internal platforms.',
      ]
    },
    {
      name: 'Majid (confidential)',
      role: 'Front-End Developer',
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
      period: '2017 – Present'
    },
    {
      institution: 'Imam Sadiq Highschool',
      location: 'Tehran',
      degree: 'Mathematics and Physics — Diploma',
      period: '2013 – 2017'
    }
  ];

  courses = [
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
