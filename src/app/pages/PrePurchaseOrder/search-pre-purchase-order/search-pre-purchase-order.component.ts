import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PrePurchaseOrderService } from "../pre-purchase-order.service";
import { PrePurchaseOrder } from "../pre.purchase.order.interface";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { ConfirmationService } from "primeng/primeng";
import { Style } from '../../Lookups/Styles/style.interface';

@Component({
  selector: "app-search-pre-purchase-order",
  templateUrl: "./search-pre-purchase-order.component.html",
  styleUrls: ["./search-pre-purchase-order.component.css"]
})
export class SearchPrePurchaseOrderComponent implements OnInit {
  prePurchaseOrders: PrePurchaseOrder[];
  selectedOrder: PrePurchaseOrder;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;

  constructor(
    private router: Router,
    private prePurchaseOrderService: PrePurchaseOrderService,
    private confirmationService: ConfirmationService
  ) { }

  addNewOrder() {
    this.router.navigateByUrl("/pages/transactions/prePurchaseOrder/prePurchaseOrder");
  }

  editOrder(order) {
    console.log("editOrder", order);
    this.router.navigateByUrl(
      "/pages/transactions/prePurchaseOrder/prePurchaseOrder/edit/" + order.OrderId
    );
  }

  ngOnInit() {
    debugger;
    this.prePurchaseOrderService.getPrePurchaseOrders().subscribe(res => {
      debugger;
      if (res.Success) {
        this.prePurchaseOrders = res.Items;
        this.prePurchaseOrders.forEach((order) => {
          order.Items.forEach((item) => {
            item.FXAmount = item.FXPrice * item.Quantity;
            if (item.StyleDefinition == null)
              item.StyleDefinition = new Style();
          });
        });
      }
    });
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  deleteOrder(order) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.prePurchaseOrderService
          .deletePrePurchaseOrder(order.OrderId)
          .subscribe(res => {
            console.log("deleteOrder - res", res);
            if (res.Success) {
              let index = this.prePurchaseOrders.indexOf(order);
              this.prePurchaseOrders = this.prePurchaseOrders.filter(
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
