import { Color } from '../Lookups/Colors/color.interface';
import { Size } from '../Lookups/Size/size.interface';
import { Vendor } from '../Lookups/Vendors/vendor.interface';
import { Currency } from '../Lookups/Currencies/currency.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { Style } from '../Lookups/Styles/style.interface';

export class PrePurchaseOrderItem {

  Vendor?: Vendor = {};
  ItemId?: number;
  OrderId?: number;
  COO?: Lookup = {};
  StyleDefinition?: Style = new Style();
  Color?: Color = {};
  ColorStr?: string;
  Size?: Size = {};
  SizeStr?: string;
  Quantity?: number;
  UnitPrice?: number;
  FXPrice?: number;
  FXAmount?: number;
  FXCurrency?: number;
  IsSelectedInOrder?: boolean;
  OrderItemId?: string;
  Currency?: Currency = {};
}
