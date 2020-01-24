import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Forwarder } from "../Lookups/Forwarders/forwarder.interface";

@Injectable()
export class ForwarderService extends ApplicationService {
  saveForwarder(forwarder: Forwarder): Observable<any> {
    console.log("saveForwarder", forwarder);
    return super.observablePost("Forwarder/Save", forwarder);
  }

  getForwarders(): Observable<any> {
    return super.observableGet("Forwarder/GetAll");
  }

  getForwarderByCode(code: string): Observable<any> {
    return super.observableGet("Forwarder/Get?code=" + code);
  }

  deleteForwarder(code: string): Observable<any> {
    return super.observableDelete("Forwarder/Delete?code=" + code);
  }

}
