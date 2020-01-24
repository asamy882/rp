import { Currency } from '../Lookups/Currencies/currency.interface';

export class CostingCurrencyRate {
  RateId: string;
  RateAmount: string;
  Currency?: Currency = {};
}
