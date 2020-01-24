import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { OTBCriteria } from './newotb.criteria';



@Injectable()
export class NewOTBService extends ApplicationService {

  getOTB(criteria: OTBCriteria): Observable<any> {
    let url = 'Plan/GetNewOTB?seasonId='+criteria.SeasonID;
    console.log('GetNewOTB',url,'criteria',criteria);
    return super.observableGet(url);
  }

  SaveOTB(otb: any): Observable<any> {
    console.log("SaveNewOTB", otb);
    return super.observablePost("Plan/SaveNewOTB", otb);
  }
  SaveOTBAsDraft(otb: any): Observable<any> {
    console.log("SaveOTB", otb);
    return super.observablePost("Plan/SaveOTBAsDraft", otb);
  }
}
