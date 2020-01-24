import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { WorkflowService } from './workflow.service';
import { Task } from './task';
import { Message } from 'primeng/primeng';
import { Router } from "@angular/router";

@Component({
  selector: "NgWorkflow",
  templateUrl: "./workflow.component.html",
})
export class WorkflowComponent implements OnInit {
  @Input()
  taskId: number;
  @Input() nextPage: string;
  task: Task = new Task();
  canApprove: boolean;
  canReject: boolean;
  canChangeRequest: boolean;
  msgs: Message[] = [];


  constructor(
    private router: Router,
    private workflowService: WorkflowService
  ) { }

  approve() {
    this.task.UserActionId = 5;
    this.workflowService
      .saveTask(this.task)
      .subscribe(res => {
        console.log("saveTask", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order approved successfully' });
          this.router.navigateByUrl(this.nextPage);
        }
      });
  }

  reject() {
    this.task.UserActionId = 6;
    this.workflowService
      .saveTask(this.task)
      .subscribe(res => {
        console.log("saveTask", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order rejected successfully' });
          if(this.nextPage)
            this.router.navigateByUrl(this.nextPage);
        }
      });
  }

  reviewed() {
    this.task.UserActionId = 2;
    this.workflowService
      .saveTask(this.task)
      .subscribe(res => {
        console.log("saveTask", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order rejected successfully' });
          if(this.nextPage)
            this.router.navigateByUrl(this.nextPage);
        }
      });
  }

  changeRequest() {
    this.task.UserActionId = 7;
    this.workflowService
      .saveTask(this.task)
      .subscribe(res => {
        console.log("saveTask", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order status changed successfully' });
          this.router.navigateByUrl(this.nextPage);
        }
      });
  }

  ngOnInit() {
    console.log('WorkflowComponent', this.taskId);
    if (this.taskId != null) {
      this.workflowService
        .getTaskById(this.taskId)
        .subscribe(res => {
          if (res.Success) {
            this.task = res.Item;
            //  console.log("task", this.task);
          }
        });
    }
  }


}
