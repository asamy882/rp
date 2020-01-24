import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-coo',
  templateUrl: './coo.component.html',
  styleUrls: ['./coo.component.css']
})
export class COOComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'COO';
    this.lookupUrl = 'LookUps/GetCOOList';
    this.colDefinition = [{field: 'Id', header: 'ID'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
