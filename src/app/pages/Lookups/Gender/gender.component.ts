import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Gender';
    this.lookupUrl = 'Lookups/GetAllItemGroups?levelId=1';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
