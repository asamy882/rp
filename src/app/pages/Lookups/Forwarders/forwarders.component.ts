import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-forwarders',
  templateUrl: './forwarders.component.html',
  styleUrls: ['./forwarders.component.css']
})
export class ForwardersComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Forwarders';
    this.lookupUrl = 'Forwarder/GetAll';
    this.colDefinition = [
      {field: 'Code', header: 'Code'},
      {field: 'Name', header: 'Name'}];
    super.ngOnInit();
  }

}
