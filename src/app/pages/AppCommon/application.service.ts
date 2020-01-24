import { Injectable } from "@angular/core";
import { RequestOptions, Headers, Http, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ApplicationService {
  baseUrl ="http://localhost:4444/api/";//"http://192.168.1.60:3333/api/";//"http://196.202.101.243:1111/api/";//"http://196.202.101.243:1111/api/"; //"http://192.168.5.60:1111/api/"; //"http://192.168.5.5:4444/api/"; //"http://196.202.101.246:4444/api/"; //"http://192.168.5.5:4444/api/"; //"http://kianpos.azurewebsites.net/api/"; //"http://192.168.5.5:4444/api/"; //  "http://kianpos.azurewebsites.net/api/"; // " "http://hr.kiansoft-eg.com/api/";

  constructor(private _http: Http, private router: Router) { }

  private getHeaders()
  {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let userToken = localStorage.getItem("UserToken");
    if (userToken !== null && userToken.length > 0) {
      headers.append("UserToken", userToken);
      headers.append("Accept", "application/json");
      return headers;
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  private _getHeaders() {
    const headers = new Headers();
    //  headers.append("Content-Type", "application/json");
    let userToken = localStorage.getItem("UserToken");
    if (userToken !== null && userToken.length > 0) {
      headers.append("UserToken", userToken);
      //  headers.append("Accept", "application/json");
      return headers;
    } else {
      this.router.navigate(['/login']);
    }
  }


  observablePost<T>(url, requestBody): Observable<T> {
    const _url = this.baseUrl + url;
    const headers = this.getHeaders();
    const options = new RequestOptions();
    options.headers = headers;
    return this._http
      .post(_url, JSON.stringify(requestBody), options)
      .map((res: any) => {
        if (res !== null && res["_body"].length > 0) {
          return JSON.parse(res._body);
        }
      });
  }

  observableGet<T>(url): Observable<T> {
    const _url = this.baseUrl + url;
    const headers = this.getHeaders();
    const options = new RequestOptions();
    options.headers = headers;
    return this._http.get(_url, options).map((res: any) => {
      // debugger;
      console.log(res._body);
      return JSON.parse(res._body);
    });
  }

  getAttchment(id): Observable<any> {
    const _url = this.baseUrl + "Attachment/Get?attachmentId=" + id;
    const headers = this._getHeaders();
    const options = new RequestOptions({ responseType: ResponseContentType.Blob });
    options.headers = headers;
    return this._http.get(_url, options).map((res: any) => {
      //    debugger;
      console.log('getAttchment', res);
      return <Blob>res.blob();
    });
  }

  exportToExcel(url): Observable<any> {
    const _url = this.baseUrl + url;
    const headers = this._getHeaders();
    const options = new RequestOptions({ responseType: ResponseContentType.Blob });
    options.headers = headers;
    return this._http.get(_url, options).map((res: any) => {
      //    debugger;
      console.log('exportToExcel', res);
      return <Blob>res.blob();
    });
  }


  observableDelete<T>(url): Observable<any> {
    const _url = this.baseUrl + url;
    const headers = this.getHeaders();
    const options = new RequestOptions();
    options.headers = headers;
    return this._http.delete(_url, options).map((res: any) => {
      if (res !== null && res["_body"].length > 0) {
        return JSON.parse(res._body);
      }
    });
  }
  observableGetWitoutToken<T>(url): Observable<any> {
    const _url = this.baseUrl + url;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = new RequestOptions();
    options.headers = headers;
    return this._http.get(_url, options).map((res: any) => {
      if (res !== null && res["_body"].length > 0) {
        return JSON.parse(res._body);
      }
    });
  }

  observablePostWithoutHeaders<T>(url, requestBody): Observable<T> {
    const _url = this.baseUrl + url;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = new RequestOptions();
    options.headers = headers;
    return this._http
      .post(_url, JSON.stringify(requestBody), options)
      .map((res: any) => {
        if (res !== null && res["_body"].length > 0) {
          return JSON.parse(res._body);
        }
      });
  }

  saveObjectOnLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  loadObjectFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  removeObjectFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  saveAttachment(file): Observable<any> {
    // debugger;
    const _url = this.baseUrl + "Attachment/Upload";
    const headers = this._getHeaders();
    const options = new RequestOptions();
    options.headers = headers;
    let formData: FormData = new FormData();
    // formData.append('Document', file);
    formData.append('file1', file, file.name);
    //console.log(file);
    // formData.append('commercialInvoice', JSON.stringify(requestBody));

    return this._http
      .post(_url, formData, options)
      .map((res: any) => {
        if (res !== null && res["_body"].length > 0) {
          return JSON.parse(res._body);
        }
      });
  }
validateStyleExcelSheet(file): Observable<any>{
  const _url = this.baseUrl + "StyleDefinition/ValidateExcelSheet";
  const headers = this._getHeaders();
  const options = new RequestOptions();
  options.headers = headers;
  let formData: FormData = new FormData();
  formData.append('file1', file, file.name);
  return this._http
    .post(_url, formData, options)
    .map((res: any) => {
      if (res !== null && res["_body"].length > 0) {
        return JSON.parse(res._body);
      }
    });
}
uploadStyleExcelSheet(file): Observable<any>{
  const _url = this.baseUrl + "StyleDefinition/UploadExcelSheet";
  const headers = this._getHeaders();
  const options = new RequestOptions();
  options.headers = headers;
  let formData: FormData = new FormData();
  formData.append('file1', file, file.name);
  return this._http
    .post(_url, formData, options)
    .map((res: any) => {
      if (res !== null && res["_body"].length > 0) {
        return JSON.parse(res._body);
      }
    });
} 
/* protected handleError(error: Response) {
       debugger;
       console.log(error);
       return Observable.throw(error.json().Message);
   }
   protected logData(response: Response) {
     console.log(response);
   }
   protected extractData(response: Response) {
     console.log(response);
     return JSON.parse(response['_body']);
   }*/
}
