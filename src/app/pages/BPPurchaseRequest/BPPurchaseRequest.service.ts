import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { BPPurchaseRequest } from "./BPPurchaseRequest.interface";

@Injectable()
export class BPPurchaseRequestService extends ApplicationService {
  savePrePurchaseOrder(bpPurchaseRequest: BPPurchaseRequest): Observable<any> {
    console.log("savePrePurchaseOrder", bpPurchaseRequest);
    return super.observablePost("BPPurchaseRequest/Save", bpPurchaseRequest);
  }

  getPrePurchaseOrders(): Observable<any> {
    return super.observableGet("BPPurchaseRequest/GetAll");
  }

  getPrePurchaseOrderById(id: number): Observable<any> {
    return super.observableGet("BPPurchaseRequest/Get?OrderId=" + id);
  }

  deletePrePurchaseOrder(id: number): Observable<any> {
    return super.observableDelete("BPPurchaseRequest/Delete?OrderId=" + id);
  }

  getNextPrePurchaseOrderNo(): Observable<any> {
    return super.observableGet("BPPurchaseRequest/GetNextOrderNo");
  }
}
