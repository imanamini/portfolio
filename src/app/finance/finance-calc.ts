export interface FinanceInputs {
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
  custom_assets_total:    number;
}

export interface FinanceTotals {
  gold_total:   number;
  silver_total: number;
  stocks_total: number;
  dollar_total: number;
  grand_total:  number;
}

// mirrors the formulas from the user's personal "Assets" tracking sheet
export function computeFinanceTotals(i: FinanceInputs): FinanceTotals {
  const physicalGoldValue = i.physical_gold_grams * i.gold_price_per_gram;

  const goldTotal = i.ayar + i.ganj + physicalGoldValue;
  const silverTotal = i.noghran + i.noghrabi;
  // dollar_price_per_unit is entered in thousand-toman (e.g. 175 for 175,000 toman);
  // every other field is in million-toman, so convert before combining
  const dollarTotal = i.dollar_amount * (i.dollar_price_per_unit / 1000);
  const stocksTotal =
    i.mofid_portfolio_total - goldTotal - i.nahal - i.tamashk - silverTotal - i.synergy + physicalGoldValue;
  const grandTotal =
    goldTotal + silverTotal + i.nahal + i.tamashk + i.synergy + stocksTotal +
    i.crypto + dollarTotal + i.custom_assets_total;

  return {
    gold_total:   goldTotal,
    silver_total: silverTotal,
    stocks_total: stocksTotal,
    dollar_total: dollarTotal,
    grand_total:  grandTotal,
  };
}
