import { Injectable, inject } from '@angular/core';
import { SUPABASE_URL, SUPABASE_KEY } from './supabase.config';
import { AuthService } from './auth.service';

export interface ExpenseEntry {
  id?:          number;
  jalali_year:  number;
  jalali_month: number;
  kind:         'income' | 'expense';
  label:        string;
  amount:       number;
  checked:      boolean;
}

export interface ExpenseMonth {
  jalali_year:  number;
  jalali_month: number;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private auth = inject(AuthService);

  private get headers(): Record<string, string> {
    return {
      apikey:          SUPABASE_KEY,
      'Content-Type':  'application/json',
      Prefer:          'return=representation',
    };
  }

  async listMonth(jalaliYear: number, jalaliMonth: number): Promise<ExpenseEntry[]> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries?jalali_year=eq.${jalaliYear}&jalali_month=eq.${jalaliMonth}&order=id.asc`,
        { headers: this.headers }
      );
      if (!res.ok) return [];
      return await res.json();
    } catch { return []; }
  }

  // used to find the nearest prior month with data for the "copy last month" action
  async listAllMonths(): Promise<ExpenseMonth[]> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries?select=jalali_year,jalali_month&order=jalali_year.desc,jalali_month.desc`,
        { headers: this.headers }
      );
      if (!res.ok) return [];
      const rows: ExpenseMonth[] = await res.json();
      const seen = new Set<string>();
      return rows.filter((r) => {
        const key = `${r.jalali_year}-${r.jalali_month}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    } catch { return []; }
  }

  async create(entry: ExpenseEntry): Promise<ExpenseEntry | null> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries`,
        { method: 'POST', headers: this.headers, body: JSON.stringify(entry) }
      );
      if (!res.ok) return null;
      const rows: ExpenseEntry[] = await res.json();
      return rows[0] ?? null;
    } catch { return null; }
  }

  async createMany(entries: ExpenseEntry[]): Promise<ExpenseEntry[]> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries`,
        { method: 'POST', headers: this.headers, body: JSON.stringify(entries) }
      );
      if (!res.ok) return [];
      return await res.json();
    } catch { return []; }
  }

  async update(id: number, patch: Partial<ExpenseEntry>): Promise<ExpenseEntry | null> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries?id=eq.${id}`,
        { method: 'PATCH', headers: this.headers, body: JSON.stringify(patch) }
      );
      if (!res.ok) return null;
      const rows: ExpenseEntry[] = await res.json();
      return rows[0] ?? null;
    } catch { return null; }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/expense_entries?id=eq.${id}`,
        { method: 'DELETE', headers: this.headers }
      );
      return res.ok;
    } catch { return false; }
  }
}
