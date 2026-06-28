import { Injectable, inject } from '@angular/core';
import { SUPABASE_URL, SUPABASE_KEY } from './supabase.config';
import { AuthService } from './auth.service';

export interface TopicProgress {
  slug:           string;
  title:          string;
  total_days:     number;
  current_day:    number;
  completed:      number[];
  last_activity:  string | null;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private auth = inject(AuthService);

  private get headers(): Record<string, string> {
    const token = this.auth.getToken() ?? SUPABASE_KEY;
    return {
      apikey:          SUPABASE_KEY,
      Authorization:   `Bearer ${token}`,
      'Content-Type':  'application/json',
      Prefer:          'return=representation',
    };
  }

  async get(slug: string): Promise<TopicProgress | null> {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/learning_progress?slug=eq.${slug}&select=*`,
        { headers: this.headers }
      );
      if (!res.ok) return null;
      const rows: TopicProgress[] = await res.json();
      return rows[0] ?? null;
    } catch { return null; }
  }

  async patch(slug: string, payload: Partial<TopicProgress>): Promise<TopicProgress | null> {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/learning_progress?slug=eq.${slug}`,
        {
          method:  'PATCH',
          headers: this.headers,
          body:    JSON.stringify({ ...payload, updated_at: new Date().toISOString() }),
        }
      );
      if (!res.ok) return null;
      const rows: TopicProgress[] = await res.json();
      return rows[0] ?? null;
    } catch { return null; }
  }
}
