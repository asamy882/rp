import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../../AppCommon/application.service";
import { SearchCriteria} from './search.criteria';



@Injectable()
export class ReportService extends ApplicationService {

  search(url: string, searchCriteria: SearchCriteria): Observable<any> {
    console.log('url',url,'searchCriteria',searchCriteria);
    return super.observablePost(url, searchCriteria);
  }


}
