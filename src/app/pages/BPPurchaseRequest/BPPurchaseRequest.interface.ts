//import { Status } from '../common/model/status.interface';
import { BPPurchaseRequestItem } from './BPPurchaseRequestItem.interface';
import { Periode } from '../Lookups/Periodes/periode.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';

export class BPPurchaseRequest {

  OrderId?: number;
  OrderNo?: string="";
  OrderDate?: string;
  Status?: Lookup;
  Items?: BPPurchaseRequestItem[]=[];
  Season?: Periode={};
  TotalQuantity?: number;
  TotalAmount?: number;

}
