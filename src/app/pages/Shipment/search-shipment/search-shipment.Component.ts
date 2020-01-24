import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs/observable/from";
import { Message } from 'primeng/primeng';
import { ShipmentService } from '../shipment.service';
import { Shipment } from '../shipment';
import { ConfirmationService } from "primeng/primeng";


@Component({
  selector: "app-search-shipment",
  templateUrl: "./search-shipment.component.html",
  styleUrls: ["./search-shipment.component.css"]
})
export class SearchShipmentComponent implements OnInit {

  shipments: Shipment[];
  selectedShipment: Shipment;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isExpensesFilter: boolean = false;
  isExpense: boolean = false;
  isItemsFilter: boolean = false;

  constructor(
    private router: Router,
    private shipmentService: ShipmentService,
    private confirmationService: ConfirmationService
  ) { }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterExpensesClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsExpensesClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  addNewShipment() {
    this.router.navigateByUrl("/pages/transactions/shipment/shipment");
  }

  editShipment(shipment) {
    // console.log("editShipment", shipment);
    this.router.navigateByUrl(
      "/pages/transactions/shipment/shipment/edit/" + shipment.ShipmentId
    );
  }

  ngOnInit() {
    this.shipmentService.getShipments().subscribe(res => {
      if (res.Success) {
        this.shipments = res.Items;
      }
    });
  }

  deleteShipment(shipment) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.shipmentService
          .deleteShipment(shipment.ShipmentId)
          .subscribe(res => {
            console.log("deleteShipment - res", res);
            if (res.Success) {
              let index = this.shipments.indexOf(shipment);
              this.shipments = this.shipments.filter(
                (val, i) => i != index
              );
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The shipment deleted successfully' });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the shipment' });
            }
          });
      }
    });
  }
  
  getShipmentStatus(status){
    var statusName='PENDING';
  if(status==2)
  {
    statusName='SHIPPED';
  }
  else if(status==3){
    statusName='UNDER CLEARANCE';
  }
  else if(status==4){
    statusName='RECEIVED AT WH';
  }
    return statusName;
}
}
