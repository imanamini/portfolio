import { Component, computed, signal, inject, afterNextRender, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuroraThemeService } from '../core/aurora-theme.service';
import { FinanceService, FinanceSnapshot } from '../core/finance.service';
import { parsePortfolioExport } from './finance-parser';
import { computeFinanceTotals, FinanceInputs } from './finance-calc';
import { todayJalali, jalaliToIso } from './jalali';

type FinanceView = 'dashboard' | 'form';

interface CustomAsset {
  label: string;
  value: number;
}

// fixed categories always tracked; custom entries are layered on top per snapshot
const FIXED_CATEGORIES: { key: 'stocks_total' | 'gold_total' | 'crypto' | 'silver_total' | 'nahal' | 'tamashk' | 'synergy' | 'dollar_total'; label: string; color: string }[] = [
  { key: 'gold_total',   label: 'طلا',    color: 'var(--gold)' },
  { key: 'stocks_total', label: 'سهام',   color: 'var(--stock)' },
  { key: 'dollar_total', label: 'دلار',   color: 'var(--dollar)' },
  { key: 'crypto',       label: 'کریپتو', color: 'var(--crypto)' },
  { key: 'silver_total', label: 'نقره',   color: 'var(--silver)' },
  { key: 'nahal',        label: 'نهال',   color: '#FF8A4C' },
  { key: 'tamashk',      label: 'تمشک',   color: '#F472B6' },
  { key: 'synergy',      label: 'سینرژی', color: '#22D3EE' },
];

const CUSTOM_COLORS = ['var(--custom)', '#FCD34D', '#4ADE80', '#C084FC', '#FB923C', '#38BDF8'];

function customAssetsToRecord(list: CustomAsset[]): Record<string, number> {
  const record: Record<string, number> = {};
  for (const item of list) {
    const label = item.label.trim();
    if (label) record[label] = Number(item.value) || 0;
  }
  return record;
}

function recordToCustomAssets(record: Record<string, number> | null | undefined): CustomAsset[] {
  return Object.entries(record ?? {}).map(([label, value]) => ({ label, value }));
}

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './finance.html',
  styleUrl: './finance.scss',
})
export class FinanceComponent {
  private auth       = inject(AuthService);
  private financeSvc = inject(FinanceService);
  private router     = inject(Router);
  themeSvc           = inject(AuroraThemeService);

  view     = signal<FinanceView>('dashboard');
  loading  = signal(false);
  saving   = signal(false);
  saved    = signal(false);
  error    = signal('');
  fileName = signal('');
  history  = signal<FinanceSnapshot[]>([]);

  private readonly initialJalali = todayJalali();
  jalaliYear  = signal(this.initialJalali.jy);
  jalaliMonth = signal(this.initialJalali.jm);
  jalaliDay   = signal(this.initialJalali.jd);

  snapshotDate = computed(() =>
    jalaliToIso({ jy: this.jalaliYear(), jm: this.jalaliMonth(), jd: this.jalaliDay() })
  );

  // auto-filled from the uploaded broker export
  ayar    = signal(0);
  ganj    = signal(0);
  nahal   = signal(0);
  tamashk = signal(0);
  synergy = signal(0);
  noghran = signal(0);
  noghrabi = signal(0);
  mofidPortfolioTotal = signal(0);

  // manual inputs — always tracked
  physicalGoldGrams = signal(0);
  goldPricePerGram  = signal(0);
  crypto            = signal(0);
  dollarAmount        = signal(0);
  dollarPricePerUnit  = signal(0);

  // manual inputs — may or may not apply on a given day
  customAssets = signal<CustomAsset[]>([]);
  customAssetsTotal = computed(() =>
    this.customAssets().reduce((sum, item) => sum + (Number(item.value) || 0), 0)
  );

  totals = computed(() => {
    const inputs: FinanceInputs = {
      ayar:                  this.ayar(),
      ganj:                  this.ganj(),
      nahal:                 this.nahal(),
      tamashk:               this.tamashk(),
      synergy:               this.synergy(),
      noghran:               this.noghran(),
      noghrabi:              this.noghrabi(),
      mofid_portfolio_total: this.mofidPortfolioTotal(),
      physical_gold_grams:   this.physicalGoldGrams(),
      gold_price_per_gram:   this.goldPricePerGram(),
      crypto:                this.crypto(),
      dollar_amount:         this.dollarAmount(),
      dollar_price_per_unit: this.dollarPricePerUnit(),
      custom_assets_total:   this.customAssetsTotal(),
    };
    return computeFinanceTotals(inputs);
  });

  // the latest saved day is "our portfolio" — falls back to a live preview if nothing saved yet
  private pieSource = computed(() => {
    const latest = this.history().at(-1);
    if (latest) return latest;

    const t = this.totals();
    return {
      ...t,
      nahal:         this.nahal(),
      tamashk:       this.tamashk(),
      synergy:       this.synergy(),
      crypto:        this.crypto(),
      custom_assets: customAssetsToRecord(this.customAssets()),
    };
  });

  pieTotal = computed(() => this.pieSource().grand_total);

  // active segments sorted largest-first — drives both the donut and its legend
  legend = computed(() => {
    const source = this.pieSource();
    const fixed = FIXED_CATEGORIES.map((def) => ({
      label: def.label,
      color: def.color,
      value: Math.max(source[def.key] ?? 0, 0),
    }));
    const custom = Object.entries(source.custom_assets ?? {})
      .filter(([, value]) => value > 0)
      .map(([label, value], idx) => ({
        label,
        color: CUSTOM_COLORS[idx % CUSTOM_COLORS.length],
        value: Math.max(value, 0),
      }));

    const segments = [...fixed, ...custom]
      .filter((s) => s.value > 0)
      .sort((a, b) => b.value - a.value);
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

    return segments.map((s) => ({ ...s, percent: Math.round((s.value / total) * 100) }));
  });

  donutGradient = computed(() => {
    const segments = this.legend();
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    if (!total) return 'var(--track)';

    let acc = 0;
    const stops = segments.map((s) => {
      const start = (acc / total) * 100;
      acc += s.value;
      const end = (acc / total) * 100;
      return `${s.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  });

  // grand-total history mapped into the 320×130 trend viewBox
  trendPaths = computed(() => {
    const rows = this.history();
    if (rows.length < 2) return null;

    const values = rows.map((r) => r.grand_total);
    const min = Math.min(...values);
    const span = (Math.max(...values) - min) || 1;
    const x = (i: number) => 10 + (i * 300) / (values.length - 1);
    const y = (v: number) => 110 - ((v - min) / span) * 95;

    const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
    const line = 'M' + points.join(' L');
    return { line, area: `${line} L310,120 L10,120 Z` };
  });

  // change vs the newest snapshot at least ~30 days old (or the oldest one)
  delta = computed(() => {
    const rows = this.history();
    if (rows.length < 2) return null;

    const latest = rows[rows.length - 1];
    const target = new Date(latest.snapshot_date).getTime() - 30 * 86400000;
    let base = rows[0];
    for (const row of rows.slice(0, -1)) {
      if (new Date(row.snapshot_date).getTime() <= target) base = row;
    }
    if (!base.grand_total || base === latest) return null;

    const pct = ((latest.grand_total - base.grand_total) / base.grand_total) * 100;
    const days = Math.max(1, Math.round(
      (new Date(latest.snapshot_date).getTime() - new Date(base.snapshot_date).getTime()) / 86400000
    ));
    return { pct: Math.abs(pct), up: pct >= 0, days };
  });

  private nf  = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 });
  private nf1 = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 });

  fmt(value: number): string {
    return this.nf.format(value || 0);
  }

  fmt1(value: number): string {
    return this.nf1.format(value || 0);
  }

  constructor() {
    afterNextRender(() => this.loadHistory());

    // if the selected day already has a saved snapshot, load it for editing
    // instead of silently overwriting it with a half-filled form on next save
    effect(() => {
      const date = this.snapshotDate();
      const existing = this.history().find((r) => r.snapshot_date === date);
      if (!existing) return;

      this.ayar.set(existing.ayar);
      this.ganj.set(existing.ganj);
      this.nahal.set(existing.nahal);
      this.tamashk.set(existing.tamashk);
      this.synergy.set(existing.synergy);
      this.noghran.set(existing.noghran);
      this.noghrabi.set(existing.noghrabi);
      this.mofidPortfolioTotal.set(existing.mofid_portfolio_total);
      this.physicalGoldGrams.set(existing.physical_gold_grams);
      this.goldPricePerGram.set(existing.gold_price_per_gram);
      this.crypto.set(existing.crypto);
      this.dollarAmount.set(existing.dollar_amount);
      this.dollarPricePerUnit.set(existing.dollar_price_per_unit);
      this.customAssets.set(recordToCustomAssets(existing.custom_assets));
    });
  }

  private async loadHistory(): Promise<void> {
    this.loading.set(true);
    this.history.set(await this.financeSvc.list());
    this.loading.set(false);

    const latest = this.history().at(-1);
    if (latest) {
      this.physicalGoldGrams.set(latest.physical_gold_grams);
      this.goldPricePerGram.set(latest.gold_price_per_gram);
      this.crypto.set(latest.crypto);
      this.dollarAmount.set(latest.dollar_amount);
      this.dollarPricePerUnit.set(latest.dollar_price_per_unit);
      this.customAssets.set(recordToCustomAssets(latest.custom_assets));
    }
  }

  showForm(): void {
    this.view.set('form');
  }

  showDashboard(): void {
    this.view.set('dashboard');
  }

  addCustomAsset(): void {
    this.customAssets.update((list) => [...list, { label: '', value: 0 }]);
  }

  removeCustomAsset(index: number): void {
    this.customAssets.update((list) => list.filter((_, i) => i !== index));
  }

  updateCustomLabel(index: number, label: string): void {
    this.customAssets.update((list) => list.map((item, i) => (i === index ? { ...item, label } : item)));
  }

  updateCustomValue(index: number, value: number): void {
    this.customAssets.update((list) => list.map((item, i) => (i === index ? { ...item, value } : item)));
  }

  async onFileSelected(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.error.set('');
    this.fileName.set(file.name);

    try {
      const parsed = await parsePortfolioExport(file);
      this.ayar.set(parsed.bySymbol.ayar);
      this.ganj.set(parsed.bySymbol.ganj);
      this.nahal.set(parsed.bySymbol.nahal);
      this.tamashk.set(parsed.bySymbol.tamashk);
      this.synergy.set(parsed.bySymbol.synergy);
      this.noghran.set(parsed.bySymbol.noghran);
      this.noghrabi.set(parsed.bySymbol.noghrabi);
      this.mofidPortfolioTotal.set(parsed.mofidPortfolioTotal);
    } catch {
      this.error.set('نتونستم فایل اکسل رو بخونم. مطمئن شو خروجی پرتفوی بورسه.');
    }
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.saved.set(false);
    this.error.set('');

    const t = this.totals();
    const snapshot: FinanceSnapshot = {
      snapshot_date:          this.snapshotDate(),
      ayar:                   this.ayar(),
      ganj:                   this.ganj(),
      nahal:                  this.nahal(),
      tamashk:                this.tamashk(),
      synergy:                this.synergy(),
      noghran:                this.noghran(),
      noghrabi:               this.noghrabi(),
      mofid_portfolio_total:  this.mofidPortfolioTotal(),
      physical_gold_grams:    this.physicalGoldGrams(),
      gold_price_per_gram:    this.goldPricePerGram(),
      crypto:                 this.crypto(),
      dollar_amount:          this.dollarAmount(),
      dollar_price_per_unit:  this.dollarPricePerUnit(),
      custom_assets:          customAssetsToRecord(this.customAssets()),
      ...t,
    };

    // on_conflict=snapshot_date makes this an upsert: saving the same day again
    // replaces that day's row instead of creating a duplicate
    const result = await this.financeSvc.upsert(snapshot);
    this.saving.set(false);

    if (!result) {
      this.error.set('ذخیره نشد. دوباره امتحان کن.');
      return;
    }

    this.saved.set(true);
    await this.loadHistory();
    this.showDashboard();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
