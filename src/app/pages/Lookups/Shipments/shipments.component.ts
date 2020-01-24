import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.saveInLocalStorage = false;
    this.lookupName = 'Shipments';
    this.lookupUrl = 'CommercialInvoice/GetInvoicesForShipment';
    this.colDefinition = [{field: 'ShipmentId', header: 'Shipment Id'},
      {field: 'ShipmentNo', header: 'Shipment No'},
      {field: 'ShipmentDate', header: 'Shipment Date'}];
    super.ngOnInit();
  }

  onSelect() {
    console.log('this.selectedItem',this.selectedItem);
    this.selectedRowListener.emit(this.selectedItem);
    this.hideDialog();

 }

}
