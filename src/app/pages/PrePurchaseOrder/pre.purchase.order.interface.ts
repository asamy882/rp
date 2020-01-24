//import { Status } from '../common/model/status.interface';
import { PrePurchaseOrderItem } from './pre.purchase.order.item.interface';
import { Periode } from '../Lookups/Periodes/periode.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';

export class PrePurchaseOrder {

  OrderId?: number;
  OrderNo?: string="";
  OrderDate?: string;
  Status?: Lookup;
  Items?: PrePurchaseOrderItem[]=[];
  Season?: Periode={};
  TotalQuantity?: number;
  TotalAmount?: number;

}
