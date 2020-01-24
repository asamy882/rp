import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../AppCommon/application.service';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';


import { Pricing } from './pricing.interface';

//Import RxJs required methods
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { from } from 'rxjs/observable/from';

@Injectable()
export class PricingService extends ApplicationService {

  /*constructor( protected http: Http, protected commonService: CommonService) {
    console.log('PrePurchaseOrderService - commonService', commonService);
  }*/

  savePricing(pricing: Pricing): Observable<any> {
    return super.observablePost('pricing/save', pricing);
    /* return this.apiUrl
             .mergeMap(url => {
                 return this.http.post(url + '/PrePurchaseOrder/Save', JSON.stringify(prePurchaseOrder), this.getRequestOptions())
                     .map((res: Response) => res.json()).catch(this.handleError);
             });*/
  }

  getAllPricing(): Observable<any> {

    return super.observableGet('pricing/GetAll');
    /* return this.apiUrl
         .mergeMap(url => {
             return this.http.get(url + '/PrePurchaseOrder/GetAll', this.getRequestOptions())
                 .map(data => data.json()).catch(this.handleError);
         });*/


  }
  getCosting(costingId:number): Observable<any> {

    return super.observableGet('costing/Get?costingId='+costingId);
    


  }
  getPricingById(id: number): Observable<any> {
    return super.observableGet('pricing/Get?pricingId=' + id);
    
  }

  deletePricing(id: number):  Observable<any> {

    return super.observableDelete('pricing/Delete?pricingId=' + id);
   
  }



}
