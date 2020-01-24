import { Expense } from './expense';
import { Currency } from '../Lookups/Currencies/currency.interface';

export class ShipmentExpense {
  ShipmentExpenseId: number;
  Expense: Expense = new Expense();
  Currency: Currency = {};
  AgrredAmount: number;
  ActualAmount: number;
}
