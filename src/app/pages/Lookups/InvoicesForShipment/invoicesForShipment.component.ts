import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-invoicesForShipment',
  templateUrl: './invoicesForShipment.component.html',
  styleUrls: ['./invoicesForShipment.component.css']
})
export class InvoicesForShipmentComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this._width = 1000;
    this.saveInLocalStorage = false;
    this.lookupName = 'InvoicesForShipment';
    this.lookupUrl = 'CommercialInvoice/GetAll';//'CommercialInvoice/GetInvoicesForShipment'
    this.colDefinition = [{field: 'InvoiceId', header: 'Invoice Id'},
      {field: 'InvoiceNo', header: 'Invoice No'},
      {field: 'InvoiceDate', header: 'Invoice Date'},
	  {field: 'Priority.Name', header: 'Priority'},
	  {field: 'PaymentTerm.Name', header: 'Payment Term'},
      {field: 'PortofLoading.Name', header: 'PortofLoading'},
      {field: 'FinalDestination.Name', header: 'Final Destination'}];
    super.ngOnInit();
  }

  selectItems() {
    this.selectedRowListener.emit(this.selectedItem);
    this.selectedItem = null;
    this.hideDialog();

 }
}
