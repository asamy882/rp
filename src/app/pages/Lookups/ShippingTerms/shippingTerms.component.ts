import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-shippingTerms',
  templateUrl: './shippingTerms.component.html',
  styleUrls: ['./shippingTerms.component.css']
})
export class ShippingTermsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'ShippingTerms';
    this.lookupUrl = 'Lookups/GetShippingTerms';
    this.colDefinition = [{field: 'TermId', header: 'Term Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
