import { toGregorian, toJalaali } from 'jalaali-js';

export interface JalaliDate {
  jy: number;
  jm: number;
  jd: number;
}

export function todayJalali(): JalaliDate {
  return toJalaali(new Date());
}

export function jalaliToIso(d: JalaliDate): string {
  const { gy, gm, gd } = toGregorian(d.jy, d.jm, d.jd);
  return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

export const JALALI_MONTH_NAMES = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

export function jalaliMonthLabel(jy: number, jm: number): string {
  return `${JALALI_MONTH_NAMES[jm - 1]} ${jy.toLocaleString('fa-IR', { useGrouping: false })}`;
}

// months don't need day-level Jalali math, so plain integer arithmetic on a
// (year*12 + month) index is enough to shift by whole months in either direction
export function shiftJalaliMonth(jy: number, jm: number, delta: number): { jy: number; jm: number } {
  const total = jy * 12 + (jm - 1) + delta;
  return { jy: Math.floor(total / 12), jm: (((total % 12) + 12) % 12) + 1 };
}
