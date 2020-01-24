import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Departments';
    this.lookupUrl = 'Lookups/GetDepartments';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
