import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Seasons';
    this.lookupUrl = 'Lookups/GetAllItemGroups?levelId=5';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
