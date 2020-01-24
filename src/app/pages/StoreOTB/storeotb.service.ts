import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";



@Injectable()
export class StoreOTBService extends ApplicationService {

  getStoreOTB(seasonId): Observable<any> {
    let url = 'Plan/GetStoreOTB?seasonId='+seasonId;
    console.log('GetStoreOTB',url);
    return super.observableGet(url);
  }

  saveStoreOTB(otbs: any[]): Observable<any> {
    console.log("SaveStoreOTB", otbs);
    return super.observablePost("Plan/SaveStoreOTB", otbs);
  }
}
