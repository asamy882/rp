import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Suppliers';
    this.lookupUrl = 'Supplier/GetAll';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'},
      {field: 'AccountNo', header: 'Account No'},
      {field: 'Country.Name', header: 'Country'}];
    super.ngOnInit();
  }

}
