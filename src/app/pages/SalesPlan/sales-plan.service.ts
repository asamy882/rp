import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { SalesPlanCriteria } from './sales-plan.criteria';



@Injectable()
export class SalesPlanService extends ApplicationService {

  SaveSalesPlan(businessPlanView: any): Observable<any> {
    console.log("SaveSalesPlan", businessPlanView);
    return super.observablePost("Plan/SaveSalesPlan", businessPlanView);
  }

  getSalesPlan(criteria: SalesPlanCriteria): Observable<any> {
    let url = 'Plan/GetSalesPlan';
    console.log('GetSalesPlan',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }

}
