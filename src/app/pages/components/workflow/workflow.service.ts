import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../../AppCommon/application.service";
import { Task } from './task';


@Injectable()
export class WorkflowService extends ApplicationService {

  saveTask(task: Task): Observable<any> {
    console.log('saveTask',task);
    return super.observablePost("Authentication/UpdateUserTask", task);
  }

  getTasks(): Observable<any> {
    return super.observableGet("Authentication/GetCurrentUserTasks");
  }

  getTaskById(id: number): Observable<any> {
    return super.observableGet("Authentication/GetTask?taskId=" + id);
  }

}
