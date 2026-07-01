import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuroraThemeService } from '../core/aurora-theme.service';

interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  totalDays: number;
  status: 'active' | 'coming-soon';
}

@Component({
  selector: 'app-learn-hub',
  standalone: true,
  templateUrl: './learn-hub.html',
  styleUrl: './learn-hub.scss',
})
export class LearnHubComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);
  themeSvc       = inject(AuroraThemeService);

  topics: Topic[] = [
    {
      slug: 'react',
      title: 'React',
      description: 'From JSX basics to advanced patterns. 27 concepts extracted from the real Pita-front project.',
      icon: '⚛️',
      color: '#61DAFB',
      route: '/learn-react',
      totalDays: 27,
      status: 'active',
    },
    {
      slug: 'typescript',
      title: 'TypeScript',
      description: 'Advanced types, generics, and patterns for large-scale Angular & React apps.',
      icon: '🟦',
      color: '#3178C6',
      route: '/learn-react',
      totalDays: 20,
      status: 'coming-soon',
    },
    {
      slug: 'rxjs',
      title: 'RxJS',
      description: 'Reactive programming, operators, and real-world patterns from fintech production code.',
      icon: '🔴',
      color: '#E50A6F',
      route: '/learn-react',
      totalDays: 15,
      status: 'coming-soon',
    },
    {
      slug: 'nodejs',
      title: 'Node.js',
      description: 'Backend fundamentals: REST APIs, auth, databases — from a frontend engineer\'s perspective.',
      icon: '🟩',
      color: '#3D9E3D',
      route: '/learn-react',
      totalDays: 18,
      status: 'coming-soon',
    },
  ];

  // "#61DAFB" → "rgba(97, 218, 251, .3)" for tinted borders/backgrounds
  tint(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  openTopic(topic: Topic): void {
    if (topic.status === 'active') {
      this.router.navigate([topic.route]);
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
