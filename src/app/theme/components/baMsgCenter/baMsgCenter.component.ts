import { Component } from '@angular/core';

import { BaMsgCenterService } from './baMsgCenter.service';
import { Router } from "@angular/router";
import { Task } from '../../../pages/components/workflow/task';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  public notifications: Task[] = [];
  // public messages:Array<Object>;

  constructor(private router: Router, private _baMsgCenterService: BaMsgCenterService) {
    this._baMsgCenterService.getNotifications().subscribe(res => {
      console.log('Notifications',res);
      if (res.Success) {
        this.notifications = res.Items;
      }
    });
    // this.messages = this._baMsgCenterService.getMessages();
  }

  /*
  PurchaseOrder = 1,
  CommercialInvoice = 2,
  Shipment = 3,
  Costing = 4,
  Pricing = 5
*/

  selectNotification(task) {
    console.log('task', task);

    let url = "";
    if (task.TransactionType == 1)
      url = "/pages/transactions/purchaseOrder/purchaseOrder/view/";
    else if (task.TransactionType == 2)
      url = "/pages/transactions/commercialInvoice/commercialInvoice/view/";
    else if (task.TransactionType == 3)
      url = "/pages/transactions/shipment/shipment/view/";
    else if (task.TransactionType == 4)
      url = "/pages/transactions/costing/costing/view/";
    else if (task.TransactionType == 5)
      url = "/pages/transactions/pricing/pricing/view/";
    else if (task.TransactionType == 6)
      url = "/pages/planning/BusinessPlan/OTB/view/";


      url += task.TaskId;
      //console.log('BaMsgCenter url',url);
 /*   this.router.navigateByUrl(
      url
    ).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log('err',err) // when there's an error
    });*/

   this.router.navigateByUrl(url).then(nav => {
      //console.log(nav); // true if navigation is successful
      let index = this.notifications.indexOf(task);
      this.notifications = this.notifications.filter((val, i) => i != index);

    }, err => {
      console.log('err',err) // when there's an error
    });

     /*   this.router.navigateByUrl(url).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log('err',err) // when there's an error
    });*/


  }

}
