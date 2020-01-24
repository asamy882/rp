import { CostingCurrencyRate } from './costing-currency-rate';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { Shipment } from '../Shipment/shipment';
import { CommercialInvoiceItem } from '../CommercialInvoice/commercial-invoice.item';

export class Costing {
  CostingId?: String = "";
  CostingName?: String = "";
  CostingDate?: String = "";
  Status?: Lookup;
  CurrencyRates?: CostingCurrencyRate[] = [];
  Shipments?: Shipment[] = [];
  Items?: CommercialInvoiceItem[] = [];
}
