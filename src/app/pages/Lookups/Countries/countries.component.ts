import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Countries';
    this.lookupUrl = 'Country/GetAll';
    this.colDefinition = [{field: 'CountryId', header: 'Country Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
