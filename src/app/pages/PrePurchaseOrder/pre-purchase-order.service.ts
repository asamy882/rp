import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { PrePurchaseOrder } from "./pre.purchase.order.interface";

@Injectable()
export class PrePurchaseOrderService extends ApplicationService {
  savePrePurchaseOrder(prePurchaseOrder: PrePurchaseOrder): Observable<any> {
    console.log("savePrePurchaseOrder", prePurchaseOrder);
    return super.observablePost("PrePurchaseOrder/Save", prePurchaseOrder);
  }

  getPrePurchaseOrders(): Observable<any> {
    return super.observableGet("PrePurchaseOrder/GetAll");
  }

  getPrePurchaseOrderById(id: number): Observable<any> {
    return super.observableGet("PrePurchaseOrder/Get?OrderId=" + id);
  }

  deletePrePurchaseOrder(id: number): Observable<any> {
    return super.observableDelete("PrePurchaseOrder/Delete?OrderId=" + id);
  }

  getNextPrePurchaseOrderNo(): Observable<any> {
    return super.observableGet("PrePurchaseOrder/GetNextOrderNo");
  }
}
