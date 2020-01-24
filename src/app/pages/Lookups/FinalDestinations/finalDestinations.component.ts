import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-finalDestinations',
  templateUrl: './finalDestinations.component.html',
  styleUrls: ['./finalDestinations.component.css']
})
export class FinalDestinationsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'FinalDestinations';
    this.lookupUrl = 'Lookups/GetFinalDestinations';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
