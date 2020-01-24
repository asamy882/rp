import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-shipmentNo',
  templateUrl: './shipmentNo.component.html',
  styleUrls: ['./shipmentNo.component.css']
})
export class ShipmentNoComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'ShipmentNo';
    this.lookupUrl = 'Lookups/GetAllItemGroups?levelId=4';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
