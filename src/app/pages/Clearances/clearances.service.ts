import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Clearance } from "../Lookups/Clearances/clearance.interface";

@Injectable()
export class ClearanceService extends ApplicationService {
  saveClearance(clearance: Clearance): Observable<any> {
    console.log("saveClearance", clearance);
    return super.observablePost("Clearance/Save", clearance);
  }

  getClearances(): Observable<any> {
    return super.observableGet("Clearance/GetAll");
  }

  getClearanceByCode(code: string): Observable<any> {
    return super.observableGet("Clearance/Get?code=" + code);
  }

  deleteClearance(code: string): Observable<any> {
    return super.observableDelete("Clearance/Delete?code=" + code);
  }

}
