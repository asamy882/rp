import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-costCenter',
  templateUrl: './costCenter.component.html',
  styleUrls: ['./costCenter.component.css']
})
export class CostCenterComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'CostCenters';
    this.lookupUrl = 'LookUps/GetCostCenters';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
