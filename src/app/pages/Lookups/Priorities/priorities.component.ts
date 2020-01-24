import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Priorities';
    this.lookupUrl = 'Lookups/GetAllPriorities';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
