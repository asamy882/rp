import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PurchaseOrderService } from "../purchase-order.service";
import { PurchaseOrder } from "../purchase.order";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { ConfirmationService } from "primeng/primeng";
import { Style } from '../../Lookups/Styles/style.interface';

@Component({
  selector: "app-search-purchase-order",
  templateUrl: "./search-purchase-order.component.html",
  styleUrls: ["./search-purchase-order.component.css"]
})
export class SearchPurchaseOrderComponent implements OnInit {
  purchaseOrders: PurchaseOrder[];
  selectedOrder: PurchaseOrder;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private confirmationService: ConfirmationService
  ) { }

  addNewOrder() {
    this.router.navigateByUrl("/pages/transactions/purchaseOrder/purchaseOrder");
  }

  editOrder(order) {
    //  console.log("editOrder", order);
    this.router.navigateByUrl(
      "/pages/transactions/purchaseOrder/purchaseOrder/edit/" + order.OrderId
    );
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }


  ngOnInit() {
    this.purchaseOrderService.getPurchaseOrders().subscribe(res => {
      if (res.Success) {
        this.purchaseOrders = res.Items;
        this.purchaseOrders.forEach((order) => {
          order.Items.forEach((item) => {
            item.FXAmount = item.FXPrice * item.Quantity;
            if (item.StyleDefinition == null)
              item.StyleDefinition = new Style();
          });
        });
      }
    });
  }

  deleteOrder(order) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.purchaseOrderService
          .deletePurchaseOrder(order.OrderId)
          .subscribe(res => {
            console.log("deleteOrder - res", res);
            if (res.Success) {
              let index = this.purchaseOrders.indexOf(order);
              this.purchaseOrders = this.purchaseOrders.filter(
                (val, i) => i != index
              );
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order deleted successfully' });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the order' });
            }
          });
      }
    });
  }
}
