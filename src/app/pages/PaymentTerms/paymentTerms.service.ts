import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { PaymentTerm } from "../Lookups/PaymentTerms/paymentTerm.interface";

@Injectable()
export class PaymentTermService extends ApplicationService {
  savePaymentTerm(paymentTerm: PaymentTerm): Observable<any> {
    console.log("savePaymentTerm", paymentTerm);
    return super.observablePost("PaymentTerm/Save", paymentTerm);
  }

  getPaymentTerms(): Observable<any> {
    return super.observableGet("PaymentTerm/GetAll");
  }

  getPaymentTermById(Id: number): Observable<any> {
    return super.observableGet("PaymentTerm/Get?id=" + Id);
  }

  deletePaymentTerm(Id: number): Observable<any> {
    return super.observableDelete("PaymentTerm/Delete?id=" + Id);
  }

}
