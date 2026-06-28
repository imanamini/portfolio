import { Injectable, signal } from '@angular/core';
import { SUPABASE_URL, SUPABASE_KEY } from './supabase.config';

const TOKEN_KEY   = 'sb-access-token';
const REFRESH_KEY = 'sb-refresh-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal<boolean>(!!localStorage.getItem(TOKEN_KEY));
  isLoading  = signal<boolean>(false);

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  async login(email: string, password: string): Promise<{ error?: string }> {
    this.isLoading.set(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        return { error: data.error_description ?? data.msg ?? 'Login failed' };
      }
      localStorage.setItem(TOKEN_KEY,   data.access_token);
      localStorage.setItem(REFRESH_KEY, data.refresh_token ?? '');
      this.isLoggedIn.set(true);
      return {};
    } catch {
      return { error: 'Network error — please try again' };
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
          method: 'POST',
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` },
        });
      } catch { /* best effort */ }
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.isLoggedIn.set(false);
  }
}
