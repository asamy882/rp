import { Vendor } from '../Lookups/Vendors/vendor.interface';
import { Currency } from '../Lookups/Currencies/currency.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { CommercialInvoiceItemOrder } from './commercial-invoice.item.order';
import { Style } from '../Lookups/Styles/style.interface';

export class CommercialInvoiceItem {

  ItemId: number;
  InvoiceId: number;
  InvoiceNo: string;
  Vendor: Vendor = {};
  COO: Lookup = {};
  StyleNumber: Style = new Style();
  ItemName: string = "";
  HTSNumber: string = "";
  Quantity: number;
  FXPrice: number;
  Currency: Currency = {};
  FXRate: number;
  UnitCost: number;
  FXAmount: number;
  MarkUp: number;
  OrderId: number;
  OrderNo: number;
  TotalFX: number;
  TotalCost: number;
  OrderItems: CommercialInvoiceItemOrder[] = [];

}
