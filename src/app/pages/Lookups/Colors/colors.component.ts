import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Colors';
    this.lookupUrl = 'LookUps/GetAllColorCodes';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
