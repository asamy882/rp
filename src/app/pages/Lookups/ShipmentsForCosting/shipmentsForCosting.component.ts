import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-shipmentsForCosting',
  templateUrl: './shipmentsForCosting.component.html',
  styleUrls: ['./shipmentsForCosting.component.css']
})
export class ShipmentsForCostingComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this._width = 1000;
    this.saveInLocalStorage = false;
    this.lookupName = 'Shipments For Costing';
    this.lookupUrl = 'Shipment/GetShipmentsForCosting';
    this.colDefinition = [
      {field: 'ShipmentNo', header: 'Shipment No'},
      {field: 'ShipmentDate', header: 'Shipment Date'},
	  {field: 'ShipmentFrom.Name', header: 'Shipment From'},
	  {field: 'ShipmentTo.Name', header: 'Shipment To'}];
    super.ngOnInit();
  }

  selectItems() {
    this.selectedRowListener.emit(this.selectedItem);
    this.hideDialog();

 }

}
