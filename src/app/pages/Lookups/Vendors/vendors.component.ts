import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Vendors';
    this.lookupUrl = 'Vendor/GetAll';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'},
      {field: 'Country.Name', header: 'Country'},
      {field: 'Supplier.Name', header: 'Supplier'},
      {field: 'PaymentTerm.Name', header: 'Payment Term'},
      {field: 'AccountNo', header: 'AccountNo'}
    ];
    super.ngOnInit();
  }

}
