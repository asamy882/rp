import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-portofLoadings',
  templateUrl: './portofLoadings.component.html',
  styleUrls: ['./portofLoadings.component.css']
})
export class PortofLoadingsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'PortofLoadings';
    this.lookupUrl = 'Lookups/GetPortofLoadings';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
