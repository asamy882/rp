import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { LookupComponent } from '../Lookup/lookup.component';


@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent extends LookupComponent implements OnInit {

        ngOnInit() {
          this.lookupName = 'Shippers';
          this.lookupUrl = 'Shipper/GetAll';
          this.colDefinition = [{field:'Code',header:'Code'},
                                {field:'Name',header:'Name'},
								{field:'Vendor.Code',header:'Vendor Code'},
                {field:'Vendor.Name',header:'Vendor Name'},
                {field:'Country.Name',header:'Country'}];
          super.ngOnInit();
        }

}
