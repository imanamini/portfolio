import * as XLSX from 'xlsx';

const SYMBOL_NAME_COL  = 'نام نماد';
const CURRENT_VALUE_COL = 'ارزش فعلی';

// broker export values are in Rial; the tracker sheet uses million-Toman units
const RIAL_TO_MILLION_TOMAN = 10_000_000;

export interface ParsedPortfolio {
  bySymbol: {
    ayar:     number;
    ganj:     number;
    nahal:    number;
    tamashk:  number;
    synergy:  number;
    noghran:  number;
    noghrabi: number;
  };
  mofidPortfolioTotal: number;
}

const FIELD_BY_SYMBOL: Record<string, keyof ParsedPortfolio['bySymbol']> = {
  'عیار':    'ayar',
  'گنج':     'ganj',
  'نهال':    'nahal',
  'تمشک':    'tamashk',
  'سینرژی':  'synergy',
  'نقران':   'noghran',
  'نقرابی':  'noghrabi',
};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export async function parsePortfolioExport(file: File): Promise<ParsedPortfolio> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: 0 });

  const bySymbol: ParsedPortfolio['bySymbol'] = {
    ayar: 0, ganj: 0, nahal: 0, tamashk: 0, synergy: 0, noghran: 0, noghrabi: 0,
  };
  let totalRial = 0;

  for (const row of rows) {
    const name = String(row[SYMBOL_NAME_COL] ?? '').trim();
    const value = Number(row[CURRENT_VALUE_COL]) || 0;
    totalRial += value;

    const field = FIELD_BY_SYMBOL[name];
    if (field) {
      bySymbol[field] = round1(value / RIAL_TO_MILLION_TOMAN);
    }
  }

  return {
    bySymbol,
    mofidPortfolioTotal: round1(totalRial / RIAL_TO_MILLION_TOMAN),
  };
}
