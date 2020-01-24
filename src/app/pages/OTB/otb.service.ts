import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { OTBCriteria } from './otb.criteria';



@Injectable()
export class OTBService extends ApplicationService {

  getOTB(criteria: OTBCriteria): Observable<any> {
    let url = 'Plan/GetOTB';
    console.log('GetOTB',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }

  SaveOTB(otb: any): Observable<any> {
    console.log("SaveOTB", otb);
    return super.observablePost("Plan/SaveOTB", otb);
  }
  SaveOTBAsDraft(otb: any): Observable<any> {
    console.log("SaveOTB", otb);
    return super.observablePost("Plan/SaveOTBAsDraft", otb);
  }
}
