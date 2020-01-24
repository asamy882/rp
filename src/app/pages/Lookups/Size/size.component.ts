import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Size';
    this.lookupUrl = 'LookUps/GetAllSizeCodes';
    this.colDefinition = [{field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
