import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-periodes',
  templateUrl: './periodes.component.html',
  styleUrls: ['./periodes.component.css']
})
export class PeriodesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Periodes';
    this.lookupUrl = 'Season/GetAll';
    this.colDefinition = [{field: 'SeasonID', header: 'Season Id'},
      {field: 'Name', header: 'Name'},
      {field: 'FromDate', header: 'From Date'},
      {field: 'ToDate', header: 'To Date'}];
    super.ngOnInit();
  }

}
