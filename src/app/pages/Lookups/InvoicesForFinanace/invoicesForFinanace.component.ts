import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-invoicesForFinanace',
  templateUrl: './invoicesForFinanace.component.html',
  styleUrls: ['./invoicesForFinanace.component.css']
})
export class InvoicesForFinanaceComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.saveInLocalStorage = false;
    this.lookupName = 'InvoicesForFinanace';
    this.lookupUrl = 'CommercialInvoice/GetInvoicesForFinanace';
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
    this.hideDialog();

 }

}
