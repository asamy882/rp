import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { CommercialInvoice } from "./commercial-invoice";

@Injectable()
export class CommercialInvoiceService extends ApplicationService {
  saveCommercialInvoice(commercialInvoice: CommercialInvoice): Observable<any> {
    console.log("saveCommercialInvoice", commercialInvoice);
    return super.observablePost("CommercialInvoice/Save", commercialInvoice);
  }
  updateCommercialInvoice(commercialInvoice: CommercialInvoice): Observable<any> {
    console.log("updateCommercialInvoice", commercialInvoice);
    return super.observablePost("CommercialInvoice/Update", commercialInvoice);
  }
  getCommercialInvoices(): Observable<any> {
    return super.observableGet("CommercialInvoice/GetAll");
  }

  getCommercialInvoicesForFinanace(): Observable<any> {
    return super.observableGet("CommercialInvoice/GetInvoicesForFinanace");
  }

  getCommercialInvoiceById(id: number): Observable<any> {
    return super.observableGet("CommercialInvoice/Get?invoiceId=" + id);
  }

  deleteCommercialInvoice(id: number): Observable<any> {
    return super.observableDelete("CommercialInvoice/Delete?invoiceId=" + id);
  }

  getNextCommercialInvoiceNo(): Observable<any> {
    return super.observableGet("CommercialInvoice/GetNextInvoiceNo");
  }
}
