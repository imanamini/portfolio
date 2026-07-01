import { Component, computed, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { AuroraThemeService } from '../core/aurora-theme.service';
import { ExpenseService, ExpenseEntry } from '../core/expense.service';
import { todayJalali, jalaliMonthLabel, shiftJalaliMonth } from '../finance/jalali';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class ExpensesComponent {
  private auth       = inject(AuthService);
  private expenseSvc = inject(ExpenseService);
  private router     = inject(Router);
  themeSvc           = inject(AuroraThemeService);

  private readonly initialJalali = todayJalali();
  jalaliYear  = signal(this.initialJalali.jy);
  jalaliMonth = signal(this.initialJalali.jm);

  monthLabel = computed(() => jalaliMonthLabel(this.jalaliYear(), this.jalaliMonth()));

  loading  = signal(false);
  copying  = signal(false);
  error    = signal('');
  entries  = signal<ExpenseEntry[]>([]);

  incomeEntries  = computed(() => this.entries().filter((e) => e.kind === 'income'));
  expenseEntries = computed(() => this.entries().filter((e) => e.kind === 'expense'));

  incomeTotal  = computed(() => this.incomeEntries().reduce((sum, e) => sum + (Number(e.amount) || 0), 0));
  expenseTotal = computed(() => this.expenseEntries().reduce((sum, e) => sum + (Number(e.amount) || 0), 0));
  balance      = computed(() => this.incomeTotal() - this.expenseTotal());

  private nf = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 });

  fmt(value: number): string {
    return this.nf.format(value || 0);
  }

  constructor() {
    // depend on both signals so switching either axis reloads the row set;
    // this also covers the initial load, so no separate afterNextRender is needed
    effect(() => {
      this.jalaliYear();
      this.jalaliMonth();
      this.loadMonth();
    });
  }

  prevMonth(): void {
    const { jy, jm } = shiftJalaliMonth(this.jalaliYear(), this.jalaliMonth(), -1);
    this.jalaliYear.set(jy);
    this.jalaliMonth.set(jm);
  }

  nextMonth(): void {
    const { jy, jm } = shiftJalaliMonth(this.jalaliYear(), this.jalaliMonth(), 1);
    this.jalaliYear.set(jy);
    this.jalaliMonth.set(jm);
  }

  private async loadMonth(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    this.entries.set(await this.expenseSvc.listMonth(this.jalaliYear(), this.jalaliMonth()));
    this.loading.set(false);
  }

  async addRow(kind: 'income' | 'expense'): Promise<void> {
    const created = await this.expenseSvc.create({
      jalali_year:  this.jalaliYear(),
      jalali_month: this.jalaliMonth(),
      kind,
      label:        '',
      amount:       0,
      checked:      false,
    });
    if (!created) {
      this.error.set('ردیف جدید ذخیره نشد.');
      return;
    }
    this.entries.update((list) => [...list, created]);
  }

  async toggleChecked(entry: ExpenseEntry): Promise<void> {
    if (!entry.id) return;
    const checked = !entry.checked;
    this.entries.update((list) => list.map((e) => (e === entry ? { ...e, checked } : e)));
    await this.expenseSvc.update(entry.id, { checked });
  }

  updateLabel(entry: ExpenseEntry, label: string): void {
    this.entries.update((list) => list.map((e) => (e === entry ? { ...e, label } : e)));
  }

  updateAmount(entry: ExpenseEntry, amount: number): void {
    this.entries.update((list) => list.map((e) => (e === entry ? { ...e, amount } : e)));
  }

  async persistRow(entry: ExpenseEntry): Promise<void> {
    if (!entry.id) return;
    await this.expenseSvc.update(entry.id, { label: entry.label, amount: entry.amount });
  }

  async removeRow(entry: ExpenseEntry): Promise<void> {
    this.entries.update((list) => list.filter((e) => e !== entry));
    if (entry.id) await this.expenseSvc.remove(entry.id);
  }

  async copyFromPreviousMonth(): Promise<void> {
    this.copying.set(true);
    this.error.set('');

    const currentIndex = this.jalaliYear() * 12 + this.jalaliMonth();
    const months = await this.expenseSvc.listAllMonths();
    const prior = months.find((m) => m.jalali_year * 12 + m.jalali_month < currentIndex);

    if (!prior) {
      this.error.set('ماه قبلی‌ای برای کپی پیدا نشد.');
      this.copying.set(false);
      return;
    }

    const sourceRows = await this.expenseSvc.listMonth(prior.jalali_year, prior.jalali_month);
    const copies: ExpenseEntry[] = sourceRows.map((r) => ({
      jalali_year:  this.jalaliYear(),
      jalali_month: this.jalaliMonth(),
      kind:         r.kind,
      label:        r.label,
      amount:       r.amount,
      checked:      false,
    }));

    this.entries.set(await this.expenseSvc.createMany(copies));
    this.copying.set(false);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
