import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { CAPEXPlanCriteria } from './capex-plan.criteria';



@Injectable()
export class CAPEXPlanService extends ApplicationService {

  SaveCAPEXPlan(businessPlanView: any): Observable<any> {
    console.log("SaveCAPEXPlan", businessPlanView);
    return super.observablePost("Plan/SaveCAPEXPlan", businessPlanView);
  }

  getCAPEXPlan(criteria: CAPEXPlanCriteria): Observable<any> {
    let url = 'Plan/GetCAPEXPlan';
    console.log('GetCAPEXPlan',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }

}
