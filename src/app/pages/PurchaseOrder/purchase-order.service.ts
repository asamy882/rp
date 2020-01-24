import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { PurchaseOrder } from "./purchase.order";

@Injectable()
export class PurchaseOrderService extends ApplicationService {
  savePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<any> {
    console.log("savePurchaseOrder", purchaseOrder);
    return super.observablePost("PurchaseOrder/Save", purchaseOrder);
  }

  savePurchaseOrderList(purchaseOrderList: PurchaseOrder[]): Observable<any> {
    console.log("savePurchaseOrderList", purchaseOrderList);
    return super.observablePost("PurchaseOrder/SaveList", purchaseOrderList);
  }

  getPurchaseOrders(): Observable<any> {
    return super.observableGet("PurchaseOrder/GetAll");
  }
  getPurchaseOrdersForInvoice(): Observable<any> {
    return super.observableGet("PurchaseOrder/GetPurchaseOrdersForInvoice");
  }

  getPurchaseOrderById(id: number): Observable<any> {
    return super.observableGet("PurchaseOrder/Get?OrderId=" + id);
  }

  deletePurchaseOrder(id: number): Observable<any> {
    return super.observableDelete("PurchaseOrder/Delete?OrderId=" + id);
  }

  getNextPurchaseOrderNo(): Observable<any> {
    return super.observableGet("PurchaseOrder/GetNextOrderNo");
  }
}
