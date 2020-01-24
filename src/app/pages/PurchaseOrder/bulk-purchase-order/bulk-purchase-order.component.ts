import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PurchaseOrderService } from "../purchase-order.service";
import { PurchaseOrder } from "../purchase.order";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { ConfirmationService } from "primeng/primeng";
import { Style } from '../../Lookups/Styles/style.interface';
import { PurchaseOrderItem } from "../purchase.order.item";

@Component({
  selector: "app-bulk-purchase-order",
  templateUrl: "./bulk-purchase-order.component.html",
  styleUrls: ["./bulk-purchase-order.component.css"]
})
export class BulkPurchaseOrderComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  selectedOrder: PurchaseOrder;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;
  canSubmitOrderForm: boolean = false;
  nextPage: string = "/pages/transactions/purchaseOrder/searchPurchaseOrder";

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private confirmationService: ConfirmationService
  ) { }


  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }


  ngOnInit() {

  }

  deleteOrder(order) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.purchaseOrders.indexOf(this.selectedOrder);
        this.purchaseOrders = this.purchaseOrders.filter((val, i) => i != index);
        this.vaildateForm();
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order deleted successfully' });
      }
    });
  }

  onSubmit() {
    this.purchaseOrderService
      .savePurchaseOrderList(this.purchaseOrders)
      .subscribe(res => {
        console.log("savePurchaseOrderList", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The orders saved successfully' });
          this.router.navigateByUrl(
            this.nextPage
          );
        }
      });
  }

  addOrdersFromCsvFile(data) {
    if (data != null) {
      debugger;
      let ordersMap: Map<string,PurchaseOrder> = new Map<string,PurchaseOrder>();
      let styles = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Styles"));
      let colors = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Colors"));
      let COOList = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("COO"));
      let vendors = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Vendors"));
      let sizeList = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Size"));
      let currencies = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Currencies"));
      let orderList = data.slice(1);
      let orders = [...this.purchaseOrders];
      orderList.forEach(i => {

        let order = ordersMap.get(i[10]);
        if(order == null){
          order = new PurchaseOrder ();
          order.OrderNo = i[10];
          order.OrderDate = i[11];
          ordersMap.set(i[10],order);
          orders.push(order);
          this.purchaseOrders = orders;
        }

        let ppoi = new PurchaseOrderItem();
        styles.forEach(s => {
          if (s.StyleNumber == i[0]) {
            ppoi.StyleDefinition = s;
            return
          }
        });
        vendors.forEach(v => {
          if (v.Code == i[1]) {
            ppoi.Vendor = v;
            return
          }
        });
        COOList.forEach(c => {
          if (c.Name == i[2]) {
            ppoi.COO = c;
            return
          }
        });
        colors.forEach(c => {
          if (c.Code == i[3]) {
            ppoi.Color = c;
            ppoi.ColorStr = c.code + " - " + c.Name;
            return
          }
        });
        sizeList.forEach(s => {
          if (s.Code == i[4]) {
            ppoi.Size = s;
            ppoi.SizeStr = s.code + " - " + s.Name;
            return
          }
        });
        ppoi.Quantity = +i[5];
        ppoi.FXPrice = +i[6];
        ppoi.Barcode = i[8];
        order.PreOrderNo = i[9];
        order.TotalAmount += ppoi.FXPrice;
        order.TotalQuantity += ppoi.Quantity;
        ppoi.FXAmount = ppoi.Quantity * ppoi.FXPrice;
        currencies.forEach(c => {
          if (c.CurrencyId == i[7]) {
            ppoi.Currency = c;
            return
          }
        });
        order.Items.push(ppoi);
      });


    }

    this.vaildateForm();
  }

  vaildateForm(){
    if(this.purchaseOrders.length > 0)
      this.canSubmitOrderForm = true;
  }
}
