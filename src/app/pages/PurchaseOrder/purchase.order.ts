//import { Status } from '../common/model/status.interface';
import { PurchaseOrderItem } from './purchase.order.item';
import { Periode } from '../Lookups/Periodes/periode.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';

export class PurchaseOrder {

  OrderId: number;
  PreOrderId: number;
  PreOrderNo: string;
  OrderNo: string="";
  OrderDate: string;
  Status: Lookup;
  CompanyId: number;
  BrandId: number;
  TotalQuantity: number = 0;
  TotalAmount: number = 0;
  Items: PurchaseOrderItem[]=[];

}
