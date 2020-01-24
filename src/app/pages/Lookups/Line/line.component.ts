import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Line';
    this.lookupUrl = 'Lookups/GetAllItemGroups?levelId=2';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
