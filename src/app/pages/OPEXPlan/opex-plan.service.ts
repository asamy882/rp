import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { OPEXPlanCriteria } from './opex-plan.criteria';



@Injectable()
export class OPEXPlanService extends ApplicationService {

  SaveOPEXPlan(businessPlanView: any): Observable<any> {
    console.log("SaveOPEXPlan", businessPlanView);
    return super.observablePost("Plan/SaveOPEXPlan", businessPlanView);
  }

  getOPEXPlan(criteria: OPEXPlanCriteria): Observable<any> {
    let url = 'Plan/GetOPEXPlan';
    console.log('GetOPEXPlan',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }

}
