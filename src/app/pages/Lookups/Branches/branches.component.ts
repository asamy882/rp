import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Branches';
    this.lookupUrl = 'Authentication/GetBranches';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
