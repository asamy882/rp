import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-clearances',
  templateUrl: './clearances.component.html',
  styleUrls: ['./clearances.component.css']
})
export class ClearancesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Clearances';
    this.lookupUrl = 'Clearance/GetAll';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
