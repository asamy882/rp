import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { AVGDiscountsCriteria } from './avg-discounts.criteria';



@Injectable()
export class AVGDiscountsService extends ApplicationService {

  SaveAVGDiscounts(businessPlanView: any): Observable<any> {
    console.log("SaveAVGDiscounts", businessPlanView);
    return super.observablePost("Plan/SaveAVGDiscounts", businessPlanView);
  }

  getAVGDiscounts(criteria: AVGDiscountsCriteria): Observable<any> {
    let url = 'Plan/GetAVGDiscounts?brandId='+criteria.BrandId+'&seasonId='+criteria.SeasonID;
    console.log('GetAVGDiscounts',url);
    return super.observableGet(url);
  }

}
