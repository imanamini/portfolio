import { Injectable, computed, signal } from '@angular/core';

const THEME_KEY = 'aurora-theme';

type Theme = 'dark' | 'light';

// One theme shared by every Aurora page, persisted across visits.
@Injectable({ providedIn: 'root' })
export class AuroraThemeService {
  theme = signal<Theme>(load());
  isLight = computed(() => this.theme() === 'light');

  toggle(): void {
    const next: Theme = this.isLight() ? 'dark' : 'light';
    this.theme.set(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode */ }
  }
}

function load(): Theme {
  try { return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'; }
  catch { return 'dark'; }
}
