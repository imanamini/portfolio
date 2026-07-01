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

  private async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) return null;

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        this.clearSession();
        return null;
      }
      localStorage.setItem(TOKEN_KEY, data.access_token);
      localStorage.setItem(REFRESH_KEY, data.refresh_token ?? refreshToken);
      return data.access_token;
    } catch {
      return null;
    }
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    this.isLoggedIn.set(false);
  }

  // Supabase access tokens expire (default 1h) and this app never refreshed
  // them proactively, so any long-lived tab would start getting 401s on every
  // REST call. This retries once with a refreshed token before giving up.
  async authFetch(input: string, init: RequestInit = {}): Promise<Response> {
    const withToken = (token: string): RequestInit => ({
      ...init,
      headers: { ...(init.headers as Record<string, string> | undefined), Authorization: `Bearer ${token}` },
    });

    const token = this.getToken() ?? SUPABASE_KEY;
    let res = await fetch(input, withToken(token));

    if (res.status === 401) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        res = await fetch(input, withToken(refreshed));
      }
    }

    return res;
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
