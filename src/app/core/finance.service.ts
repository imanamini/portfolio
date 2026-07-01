import { Injectable, inject } from '@angular/core';
import { SUPABASE_URL, SUPABASE_KEY } from './supabase.config';
import { AuthService } from './auth.service';

export interface FinanceSnapshot {
  snapshot_date:          string;
  ayar:                   number;
  ganj:                   number;
  nahal:                  number;
  tamashk:                number;
  synergy:                number;
  noghran:                number;
  noghrabi:               number;
  mofid_portfolio_total:  number;
  physical_gold_grams:    number;
  gold_price_per_gram:    number;
  crypto:                 number;
  dollar_amount:          number;
  dollar_price_per_unit:  number;
  custom_assets:          Record<string, number>;
  gold_total:             number;
  silver_total:           number;
  stocks_total:           number;
  dollar_total:           number;
  grand_total:            number;
}

@Injectable({ providedIn: 'root' })
export class FinanceService {
  private auth = inject(AuthService);

  private get headers(): Record<string, string> {
    return {
      apikey:          SUPABASE_KEY,
      'Content-Type':  'application/json',
      Prefer:          'return=representation',
    };
  }

  async list(): Promise<FinanceSnapshot[]> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/finance_snapshots?select=*&order=snapshot_date.asc`,
        { headers: this.headers }
      );
      if (!res.ok) return [];
      return await res.json();
    } catch { return []; }
  }

  async upsert(snapshot: FinanceSnapshot): Promise<FinanceSnapshot | null> {
    try {
      const res = await this.auth.authFetch(
        `${SUPABASE_URL}/rest/v1/finance_snapshots?on_conflict=snapshot_date`,
        {
          method:  'POST',
          headers: { ...this.headers, Prefer: 'return=representation,resolution=merge-duplicates' },
          body:    JSON.stringify(snapshot),
        }
      );
      if (!res.ok) return null;
      const rows: FinanceSnapshot[] = await res.json();
      return rows[0] ?? null;
    } catch { return null; }
  }
}
