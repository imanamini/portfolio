import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

interface HubApp {
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  cta: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  apps: HubApp[] = [
    {
      title: 'دارایی‌ها',
      description: 'پرتفوی، ترکیب دارایی‌ها و روند جمع کل ثروت',
      icon: '💰',
      color: '#FBBF24',
      route: '/finance',
      cta: 'مشاهده',
    },
    {
      title: 'هزینه‌ها',
      description: 'دخل و خرج ماهانه و برآیند کلی هر ماه',
      icon: '🧾',
      color: '#34D399',
      route: '/expenses',
      cta: 'مشاهده',
    },
    {
      title: 'یادگیری',
      description: 'مسیرهای یادگیری React، TypeScript و بیشتر',
      icon: '📚',
      color: '#60A5FA',
      route: '/learn',
      cta: 'ادامه',
    },
  ];

  open(app: HubApp): void {
    this.router.navigate([app.route]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
