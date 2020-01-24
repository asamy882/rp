import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Shipper } from "../Lookups/Shippers/shipper.interface";

@Injectable()
export class ShipperService extends ApplicationService {
  saveShipper(shipper: Shipper): Observable<any> {
    console.log("saveShipper", shipper);
    return super.observablePost("Shipper/Save", shipper);
  }

  getShippers(): Observable<any> {
    return super.observableGet("Shipper/GetAll");
  }

  getShipperByCode(code: string): Observable<any> {
    return super.observableGet("Shipper/Get?code=" + code);
  }

  deleteShipper(code: string): Observable<any> {
    return super.observableDelete("Shipper/Delete?code=" + code);
  }

}
