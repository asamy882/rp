import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-paymentTerms',
  templateUrl: './paymentTerms.component.html',
  styleUrls: ['./paymentTerms.component.css']
})
export class PaymentTermsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'PaymentTerms';
    this.lookupUrl = 'PaymentTerm/GetAll';
    this.colDefinition = [{field: 'TermId', header: 'Term Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
