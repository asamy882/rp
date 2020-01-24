import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";



@Injectable()
export class SeasonOTBService extends ApplicationService {

  getSeasonOTB(seasonId): Observable<any> {
    let url = 'Plan/GetSeasonOTB?seasonId='+seasonId;
    console.log('GetSeasonOTB',url);
    return super.observableGet(url);
  }

  getOTBStoreWeights(seasonId): Observable<any> {
    let url = 'Plan/GetOTBStoreWeights?seasonId='+seasonId;
    console.log('GetOTBStoreWeights',url);
    return super.observableGet(url);
  }

  SaveSeasonOTB(otb: any): Observable<any> {
    console.log("SaveSeasonOTB", otb);
    return super.observablePost("Plan/SaveSeasonOTB", otb);
  }
}
