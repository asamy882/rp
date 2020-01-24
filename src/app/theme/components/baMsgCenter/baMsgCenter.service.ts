import {Injectable} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ApplicationService } from '../../../pages/AppCommon/application.service';

@Injectable()
export class BaMsgCenterService extends ApplicationService {

 /* public getMessages():Array<Object> {
    return this._messages;
  }*/

  public getNotifications():Observable<any> {
    return super.observableGet("Authentication/GetCurrentUserTasks");
  }
}
