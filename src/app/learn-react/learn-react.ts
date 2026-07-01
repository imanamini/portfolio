import { Component, computed, signal, inject, afterNextRender } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LESSONS, Lesson } from './learn-react-data';
import { AuthService } from '../core/auth.service';
import { AuroraThemeService } from '../core/aurora-theme.service';
import { ProgressService } from '../core/progress.service';

const STORAGE_KEY = 'react-learning-completed';
const DAY_KEY     = 'react-learning-current-day';
const TOPIC       = 'react';

// aurora palette — matches the CSS vars in shared/_aurora.scss
const CATEGORY_COLORS: Record<string, string> = {
  'Basics':       '#4F8DF7',
  'Hooks':        '#A78BFA',
  'Patterns':     '#2DD4A7',
  'Advanced':     '#F6B23E',
  'Architecture': '#FB7699',
};

const DONE_COLOR = '#2DD4A7';

@Component({
  selector: 'app-learn-react',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './learn-react.html',
  styleUrl: './learn-react.scss',
})
export class LearnReactComponent {
  private auth        = inject(AuthService);
  private progressSvc = inject(ProgressService);
  private router      = inject(Router);
  themeSvc            = inject(AuroraThemeService);

  doneColor = DONE_COLOR;

  lessons = LESSONS;

  completed  = signal<Set<number>>(this.loadCompleted());
  currentDay = signal<number>(this.loadCurrentDay());
  activeDay  = signal<number | null>(null);
  activeTab  = signal<'lesson' | 'angular'>('lesson');
  syncing    = signal<boolean>(false);

  progress       = computed(() => Math.round((this.completed().size / LESSONS.length) * 100));
  completedCount = computed(() => this.completed().size);

  activeLesson = computed<Lesson | null>(() =>
    this.activeDay() !== null ? (LESSONS.find(l => l.day === this.activeDay()) ?? null) : null
  );

  todayLesson = computed<Lesson | null>(() =>
    LESSONS.find(l => l.day === this.currentDay()) ?? null
  );

  get categories(): string[] {
    return ['Basics', 'Hooks', 'Patterns', 'Advanced', 'Architecture'];
  }

  constructor() {
    afterNextRender(() => this.syncFromSupabase());
  }

  // ── Supabase sync ─────────────────────────────────────────────────────────

  private async syncFromSupabase(): Promise<void> {
    this.syncing.set(true);
    const data = await this.progressSvc.get(TOPIC);
    this.syncing.set(false);
    if (!data) return;

    const completedSet = new Set<number>(data.completed);
    this.completed.set(completedSet);
    this.currentDay.set(data.current_day);
    this.saveCompleted(completedSet);
    localStorage.setItem(DAY_KEY, String(data.current_day));
  }

  // ── Storage ───────────────────────────────────────────────────────────────

  private loadCompleted(): Set<number> {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
  }

  private loadCurrentDay(): number {
    try { return parseInt(localStorage.getItem(DAY_KEY) || '1', 10); }
    catch { return 1; }
  }

  private saveCompleted(s: Set<number>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  isCompleted(day: number): boolean { return this.completed().has(day); }

  openLesson(day: number): void {
    this.activeDay.set(day);
    this.activeTab.set('lesson');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }

  closeLesson(): void { this.activeDay.set(null); }

  async markCompleted(day: number): Promise<void> {
    const next = new Set(this.completed());
    next.add(day);
    this.completed.set(next);
    this.saveCompleted(next);

    let nextDay = this.currentDay();
    if (day === this.currentDay() && day < LESSONS.length) {
      nextDay = day + 1;
      this.currentDay.set(nextDay);
      localStorage.setItem(DAY_KEY, String(nextDay));
    }

    await this.progressSvc.patch(TOPIC, {
      completed:     [...next],
      current_day:   nextDay,
      last_activity: new Date().toISOString(),
    });
  }

  async unmarkCompleted(day: number): Promise<void> {
    const next = new Set(this.completed());
    next.delete(day);
    this.completed.set(next);
    this.saveCompleted(next);

    await this.progressSvc.patch(TOPIC, { completed: [...next] });
  }

  setTab(tab: 'lesson' | 'angular'): void { this.activeTab.set(tab); }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  getCategoryColor(cat: string): string { return CATEGORY_COLORS[cat] || '#9AA7BE'; }

  isWeekStart(day: number): boolean { return day === 1 || day === 8 || day === 15 || day === 22; }

  getWeekLabel(day: number): string {
    if (day <= 7)  return 'Week 1 — React Basics';
    if (day <= 14) return 'Week 2 — Hooks';
    if (day <= 21) return 'Week 3 — Patterns';
    return 'Week 4 — Advanced + Architecture';
  }

  getCompletedInCategory(cat: string): number {
    return LESSONS.filter(l => l.category === cat && this.isCompleted(l.day)).length;
  }

  getTotalInCategory(cat: string): number {
    return LESSONS.filter(l => l.category === cat).length;
  }
}
