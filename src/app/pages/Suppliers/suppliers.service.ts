import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Supplier } from "../Lookups/Suppliers/supplier.interface";

@Injectable()
export class SupplierService extends ApplicationService {
  saveSupplier(supplier: Supplier): Observable<any> {
    console.log("saveSupplier", supplier);
    return super.observablePost("Supplier/Save", supplier);
  }

  getSuppliers(): Observable<any> {
    return super.observableGet("Supplier/GetAll");
  }

  getSupplierByCode(code: string): Observable<any> {
    return super.observableGet("Supplier/Get?code=" + code);
  }

  deleteSupplier(code: string): Observable<any> {
    return super.observableDelete("Supplier/Delete?code=" + code);
  }

}
