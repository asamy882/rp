import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { TrendForecastingCriteria } from './trend.forecasting.criteria';



@Injectable()
export class TrendForecastingService extends ApplicationService {

  getTrendForecasting(criteria: TrendForecastingCriteria): Observable<any> {
    let url = 'Plan/GetTrendForecasting?branchId='+criteria.BranchId+'&seasonId='+criteria.SeasonID;
    console.log('getTrendForecasting',url);
    return super.observableGet(url);
  }


}
