import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { PurchaseBusinessPlanCriteria } from './purchase-business-plan.criteria';



@Injectable()
export class PurchaseBusinessPlanService extends ApplicationService {

  calculateBusinessPlan(criteria: PurchaseBusinessPlanCriteria): Observable<any> {
    let url = 'Plan/CalculatePurchaseBusinessPlan';
    console.log('CalculatePurchaseBusinessPlan',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }

  SavePurchaseBusinessPlan(businessPlanView: any): Observable<any> {
    console.log("SavePurchaseBusinessPlan", businessPlanView);
    return super.observablePost("Plan/SavePurchaseBusinessPlan", businessPlanView);
  }

  findPurchaseBusinessPlan(criteria: PurchaseBusinessPlanCriteria): Observable<any> {
    let url = 'Plan/FindPurchaseBusinessPlan';
    console.log('FindPurchaseBusinessPlan',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }  

  exportToExcel(planId): Observable<any> {
    return super.exportToExcel("Reports/ExportPurchaseBPToExcel?planId="+planId);
   }
}
