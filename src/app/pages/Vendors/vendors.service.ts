import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Vendor } from "../Lookups/Vendors/vendor.interface";

@Injectable()
export class VendorService extends ApplicationService {
  saveVendor(vendor: Vendor): Observable<any> {
    console.log("saveVendor", vendor);
    return super.observablePost("Vendor/Save", vendor);
  }

  getVendors(): Observable<any> {
    return super.observableGet("Vendor/GetAll");
  }

  getVendorByCode(code: string): Observable<any> {
    return super.observableGet("Vendor/Get?code=" + code);
  }

  deleteVendor(code: string): Observable<any> {
    return super.observableDelete("Vendor/Delete?code=" + code);
  }

}
