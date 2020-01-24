import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { CategoryWeightCriteria } from './category-weight.criteria';



@Injectable()
export class CategoryWeightReportService extends ApplicationService {

  getCategoriesWeight(criteria: CategoryWeightCriteria): Observable<any> {
    let url = 'Reports/GetCategoriesWeight';
    console.log('getCategoriesWeight',url,'criteria',criteria);
    return super.observablePost(url, criteria);
  }
  exportToExcel(criteria: CategoryWeightCriteria): Observable<any> {
   return super.exportToExcel("Reports/ExportCategoryWeightToExcel?seasonID="+criteria.SeasonID);
  }
}
