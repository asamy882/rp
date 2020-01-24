import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-shipmentTo',
  templateUrl: './shipmentTo.component.html',
  styleUrls: ['./shipmentTo.component.css']
})
export class ShipmentToComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'ShipmentTo';
    this.lookupUrl = 'Lookups/GetShipmentTos';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
