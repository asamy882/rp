import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Description';
    this.lookupUrl = 'Lookups/GetAllItemGroups?levelId=3';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
