import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { SalesMonthsCriteria } from './sales-months.criteria';



@Injectable()
export class SalesMonthsService extends ApplicationService {

  SaveSalesMonths(businessPlanView: any): Observable<any> {
    console.log("SaveSalesMonths", businessPlanView);
    return super.observablePost("Plan/SaveSalesMonths", businessPlanView);
  }

  getSalesMonths(criteria: SalesMonthsCriteria): Observable<any> {
    let url = 'Plan/GetSalesMonths?branchId='+criteria.BranchId+'&seasonId='+criteria.SeasonID;
    console.log('GetSalesMonths',url);
    return super.observableGet(url);
  }

}
