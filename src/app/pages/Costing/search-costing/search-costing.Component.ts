import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { CostingService } from '../costing.service';
import { Costing } from '../costing';
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: "app-search-costing",
  templateUrl: "./search-costing.component.html",
  styleUrls: ["./search-costing.component.css"]
})
export class SearchCostingComponent implements OnInit {

  costingList: Costing[];
  selectedCosting: Costing;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;
  isIvoicesFilter: boolean = false;
  isShipmentsFilter: boolean = false;

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  filterIvoicesClicked() {
    (this.isIvoicesFilter) ? this.isIvoicesFilter = false : this.isIvoicesFilter = true;
  }

  filterShipmentsClicked() {
    (this.isShipmentsFilter) ? this.isShipmentsFilter = false : this.isShipmentsFilter = true;
  }

  constructor(
    private router: Router,
    private costingService: CostingService,
    private confirmationService: ConfirmationService
  ) { }

  addNewCosting() {
    this.router.navigateByUrl("/pages/transactions/costing/costing");
  }

  editCosting(costing) {
    // console.log("editCosting", costing);
    this.router.navigateByUrl(
      "/pages/transactions/costing/costing/edit/" + costing.CostingId
    );
  }

  ngOnInit() {
    this.costingService.getCostings().subscribe(res => {
      if (res.Success) {
        this.costingList = res.Items;
        /*  this.costingList.forEach((costing) => {
            costing.CostingInvoices.forEach((invoice) =>{
              invoice.Items.forEach(i => { costing.TotalQTY += (i.FXPrice * i.Quantity);
                costing.TotalQTY += i.Quantity;
              });
            });
          });*/
      }
    });
  }

  deleteCosting(costing) {
  //  console.log('deleteCosting',costing);
   // debugger;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.costingService
        .deleteCosting(costing.CostingId)
        .subscribe(res => {
          console.log("deleteCosting - res", res);
          if (res.Success) {
            let index = this.costingList.indexOf(costing);
            this.costingList = this.costingList.filter(
              (val, i) => i != index
            );
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The costing deleted successfully' });
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the costing' });
          }
        });
      }
  });
  }
}
