import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { BPPurchaseRequestService } from "../BPPurchaseRequest.service";
import { BPPurchaseRequest } from "../BPPurchaseRequest.interface";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { ConfirmationService } from "primeng/primeng";
import { Style } from '../../Lookups/Styles/style.interface';

@Component({
  selector: "app-search-BP-Purchase-Request",
  templateUrl: "./search-BP-Purchase-Request.component.html",
  styleUrls: ["./search-BP-Purchase-Request.component.css"]
})
export class SearchBPPurchaseRequestComponent implements OnInit {
  prePurchaseOrders: BPPurchaseRequest[];
  selectedOrder: BPPurchaseRequest;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;

  constructor(
    private router: Router,
    private bpPurchaseRequestService: BPPurchaseRequestService,
    private confirmationService: ConfirmationService
  ) { }

  addNewOrder() {
    this.router.navigateByUrl("/pages/business plan/bpPurchaseRequest/bpPurchaseRequest");
  }

  editOrder(order) {
    console.log("editOrder", order);
    this.router.navigateByUrl(
      "/pages/business plan/bpPurchaseRequest/bpPurchaseRequest/edit/" + order.RequestId
    );
  }

  ngOnInit() {
    debugger;
    this.bpPurchaseRequestService.getPrePurchaseOrders().subscribe(res => {
      debugger;
      if (res.Success) {
        this.prePurchaseOrders = res.Items;
       
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
        this.bpPurchaseRequestService
          .deletePrePurchaseOrder(order.RequestId)
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
