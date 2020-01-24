import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Currencies';
    this.lookupUrl = 'Currency/GetAll';
    this.colDefinition = [{field: 'CurrencyId', header: 'Currency Id'},
      {field: 'CurrencyName', header: 'CurrencyName'}];
    super.ngOnInit();
  }

}
