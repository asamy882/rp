import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { NewSalesPlanCriteria } from './new-sales-plan.criteria';



@Injectable()
export class NewSalesPlanService extends ApplicationService {

  getNewSalesPlan(criteria: NewSalesPlanCriteria): Observable<any> {
    let url = 'Plan/GetNewSalesPlan?branchId='+criteria.BranchId+'&seasonId='+criteria.SeasonID;
    console.log('GetNewSalesPlan',url);
    return super.observableGet(url);
  }

  SaveNewSalesPlan(businessPlanView: any): Observable<any> {
    console.log("SaveNewSalesPlan", businessPlanView);
    return super.observablePost("Plan/SaveNewSalesPlan", businessPlanView);
  }

  exportToExcel(planId): Observable<any> {
    return super.exportToExcel("Reports/ExportPurchaseBPToExcel?planId="+planId);
   }
}
