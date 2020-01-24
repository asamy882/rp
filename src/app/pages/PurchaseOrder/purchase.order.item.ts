import { Color } from '../Lookups/Colors/color.interface';
import { Size } from '../Lookups/Size/size.interface';
import { Vendor } from '../Lookups/Vendors/vendor.interface';
import { Currency } from '../Lookups/Currencies/currency.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { Style } from '../Lookups/Styles/style.interface';

export class PurchaseOrderItem {

  Vendor: Vendor = {};
  ItemId: number;
  OrderId: number;
  OrderNo: string;
  COO: Lookup = {};
  StyleDefinition: Style = new Style();
  ColorStr: string = "";
  SizeStr: string = "";
  Color: Color = {};
  Size: Size = {};
  Quantity: number;
  UnitPrice: number;
  FXAmount: number;
  FXPrice: number;
  PreOrderItemId: number;
  InvoiceItemId: number;
  Currency: Currency = {};
  Barcode: string = "";

}
