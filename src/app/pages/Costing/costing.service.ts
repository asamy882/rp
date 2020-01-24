import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Costing } from "./costing";

@Injectable()
export class CostingService extends ApplicationService {
  saveCosting(costing: Costing): Observable<any> {
  //  console.log("saveCosting", costing);
    return super.observablePost("Costing/Save", costing);
  }

  calculateCosting(costing: Costing): Observable<any> {
 //   console.log("calculateCosting", costing);
    return super.observablePost("Costing/CalculateCosting", costing);
  }

  getCostings(): Observable<any> {
    return super.observableGet("Costing/GetAll");
  }

  getCostingById(id: number): Observable<any> {
    return super.observableGet("Costing/Get?costingId=" + id);
  }

  deleteCosting(id: number): Observable<any> {
    return super.observableDelete("Costing/Delete?costingId=" + id);
  }

  getNextCostingNo(): Observable<any> {
    return super.observableGet("Costing/GetNextCostingNo");
  }

  getCurrencies(): Observable<any> {
    return super.observableGet("Currency/GetAll");
  }
}
