import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { FigureViewCriteria } from './figure.view.criteria';



@Injectable()
export class FigureViewService extends ApplicationService {

  getFigures(figureViewCriteria: FigureViewCriteria): Observable<any> {
    let url = 'Reports/GetFigures';
    console.log('getFigures',url,'figureViewCriteria',figureViewCriteria);
    return super.observablePost(url, figureViewCriteria);
  }


}
