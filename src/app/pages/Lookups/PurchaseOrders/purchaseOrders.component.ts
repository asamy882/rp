import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
import {PurchaseOrderService} from '../../PurchaseOrder/purchase-order.service';
import {PurchaseOrderItem} from '../../PurchaseOrder/purchase.order.item';
import {PurchaseOrder} from '../../PurchaseOrder/purchase.order';
import { log } from 'util';


@Component({
  selector: 'app-purchaseOrders',
  templateUrl: './purchaseOrders.component.html',
  styleUrls: ['./purchaseOrders.component.css']
})
export class PurchaseOrdersComponent implements OnInit {

  @Output() selectedRowListener: EventEmitter<any> = new EventEmitter<any>();
   _modal: boolean =false;
   _height: number = 750;
   _width: number = 1000;
   display: boolean = false;
   items: PurchaseOrderItem[]=[];
   purchaseOrders: PurchaseOrder[];
   selectedItem: any;
   isFilter: boolean = false;

  constructor(private purchaseOrderService: PurchaseOrderService) { }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  ngOnInit() {
   // debugger;
    this.purchaseOrderService.getPurchaseOrdersForInvoice().subscribe(res => {
      let _items: PurchaseOrderItem[]=[];
      if (res.Success) {
        this.purchaseOrders = res.Items;
        this.purchaseOrders.forEach((order) => {
          order.Items.forEach((item) => {
            item.OrderNo = order.OrderNo;
            item.FXAmount = item.FXPrice * item.Quantity;
            _items.push(item);
          });
        });
      }
      this.items = _items;
    });
  }


  selectItems() {
    //console.log('selectedItem',this.selectedItem);
    this.selectedRowListener.emit(this.selectedItem);
    this.hideDialog();

 }

 showDialog() {
  this.display = true;
}

hideDialog() {
this.display = false;
}


}
