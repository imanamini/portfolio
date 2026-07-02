import { Component, computed, inject, signal, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuroraThemeService } from '../core/aurora-theme.service';
import { FinanceService } from '../core/finance.service';
import { ExpenseService } from '../core/expense.service';
import { ProgressService } from '../core/progress.service';
import { todayJalali } from '../finance/jalali';

// keep in sync with LESSONS in learn-react-data (not imported — that file
// is ~2k lines of lesson content and would bloat the home chunk)
const REACT_TOTAL_DAYS = 27;

interface HubApp {
  title: string;
  description: string;
  icon: string;
  route: string;
  cta: string;
  gradFrom: string;
  gradTo: string;
  glow: string;
  ctaColor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private auth        = inject(AuthService);
  private router      = inject(Router);
  private financeSvc  = inject(FinanceService);
  private expenseSvc  = inject(ExpenseService);
  private progressSvc = inject(ProgressService);
  themeSvc            = inject(AuroraThemeService);

  reactTotalDays = REACT_TOTAL_DAYS;

  totalAssets  = signal<number | null>(null);
  monthBalance = signal<number | null>(null);
  // seed from localStorage synchronously so the tile shows real progress
  // immediately, instead of waiting on (and being blanked by) Supabase
  reactDone    = signal<number | null>(this.readLocalReactDone());

  apps = computed<HubApp[]>(() => {
    const done = this.reactDone();
    return [
      {
        title: 'Assets',
        description: "Your whole portfolio at a glance — how it's split, and where your net worth is heading.",
        icon: '💎',
        route: '/finance',
        cta: 'Open →',
        gradFrom: '#F6B23E',
        gradTo: '#F97316',
        glow: 'rgba(246, 178, 62, .34)',
        ctaColor: '#F6B23E',
      },
      {
        title: 'Expenses',
        description: "What came in, what went out, and exactly what's left — month by month.",
        icon: '🧾',
        route: '/expenses',
        cta: 'Open →',
        gradFrom: '#2DD4A7',
        gradTo: '#14B88A',
        glow: 'rgba(45, 212, 167, .32)',
        ctaColor: '#2DD4A7',
      },
      {
        title: 'Learning',
        description: done
          ? `One concept a day — React now, more to come. You're ${done} days in.`
          : 'One concept a day — React now, more to come.',
        icon: '📚',
        route: '/learn',
        cta: 'Continue →',
        gradFrom: '#4F8DF7',
        gradTo: '#A78BFA',
        glow: 'rgba(96, 165, 250, .34)',
        ctaColor: '#60A5FA',
      },
    ];
  });

  private nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  fmt(value: number): string {
    return this.nf.format(value);
  }

  constructor() {
    afterNextRender(() => this.loadGlance());
  }

  // best-effort stats for the quick-glance strip; tiles show "—" until loaded
  private async loadGlance(): Promise<void> {
    const { jy, jm } = todayJalali();

    const [snapshots, monthRows, progress] = await Promise.all([
      this.financeSvc.list(),
      this.expenseSvc.listMonth(jy, jm),
      this.progressSvc.get('react'),
    ]);

    const latest = snapshots.at(-1);
    if (latest) this.totalAssets.set(latest.grand_total);

    if (monthRows.length) {
      const sum = (kind: 'income' | 'expense') =>
        monthRows.filter((r) => r.kind === kind).reduce((acc, r) => acc + (Number(r.amount) || 0), 0);
      this.monthBalance.set(sum('income') - sum('expense'));
    }

    // Reconcile Supabase with localStorage: whichever source has more completed
    // days wins. A stale or empty row on either side must never blank a count
    // the other side still has — that's what made this tile show 0.
    const remote = progress?.completed?.length ?? 0;
    const local  = this.readLocalReactDone() ?? 0;
    if (remote || local) {
      this.reactDone.set(Math.max(remote, local));
    }
  }

  private readLocalReactDone(): number | null {
    try {
      const local = localStorage.getItem('react-learning-completed');
      return local ? (JSON.parse(local) as number[]).length : null;
    } catch {
      return null;
    }
  }

  open(app: HubApp): void {
    this.router.navigate([app.route]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
