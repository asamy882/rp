import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Style } from "../Lookups/Styles/style.interface";

@Injectable()
export class StyleService extends ApplicationService {
  saveStyle(style: Style): Observable<any> {
    console.log("saveStyle", style);
    return super.observablePost("StyleDefinition/Save", style);
  }

  getStyles(): Observable<any> {
    return super.observableGet("StyleDefinition/GetAll");
  }

  getStyleByStyleNumber(styleNumber: string): Observable<any> {
    return super.observableGet("StyleDefinition/Get?styleNumber=" + styleNumber);
  }

  deleteStyle(styleNumber: string): Observable<any> {
    return super.observableDelete("StyleDefinition/Delete?styleNumber=" + styleNumber);
  }

  validateStyleExcelSheet(file): Observable<any> {
   return super.validateStyleExcelSheet(file);
  }

  uploadStyleExcelSheet(file): Observable<any> {
    return super.uploadStyleExcelSheet(file);
   }

}
