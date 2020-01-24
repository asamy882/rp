import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-shipmentFrom',
  templateUrl: './shipmentFrom.component.html',
  styleUrls: ['./shipmentFrom.component.css']
})
export class ShipmentFromComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'ShipmentFrom';
    this.lookupUrl = 'Lookups/GetShipmentFroms';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
