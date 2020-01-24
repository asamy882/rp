import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { MovingSearchCriteria } from './moving.search.criteria';



@Injectable()
export class MovingReportService extends ApplicationService {

  search(url: string, searchCriteria: MovingSearchCriteria): Observable<any> {
    console.log('url', url, 'searchCriteria', searchCriteria);
    return super.observablePost(url, searchCriteria);
  }


}
