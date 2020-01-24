import { Color } from '../Lookups/Colors/color.interface';
import { Size } from '../Lookups/Size/size.interface';
import { Vendor } from '../Lookups/Vendors/vendor.interface';
import { Currency } from '../Lookups/Currencies/currency.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { Priority } from '../Lookups/Priorities/priority.interface';

export class BPPurchaseRequestItem {

  ItemId?: number;
  RequestId?: number;
  ItemName?: string;
  ItemGroup1?: Lookup = {};
  ItemGroup2?: Lookup = {};
  ItemGroup3?: Lookup = {};
  Quantity?: number;
  AvgCostPrice?: number;
  FXCurrency?: number;
  Currency?: Currency = {};
  Priority?: Priority = {};
  Comments:string;
}
