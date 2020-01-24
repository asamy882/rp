import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';


@Component({
  selector: 'app-prePurchaseOrders',
  templateUrl: './prePurchaseOrders.component.html',
  styleUrls: ['./prePurchaseOrders.component.css']
})
export class PrePurchaseOrdersComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.saveInLocalStorage = false;
    this.lookupName = 'PrePurchaseOrders';
    this.lookupUrl = 'PrePurchaseOrder/GetAll';
    this.colDefinition = [{field: 'OrderNo', header: 'Order No'},
      {field: 'OrderDate', header: 'Order Date'},
	  {field: 'Season.Name', header: 'Periode'}];
    super.ngOnInit();
  }

}
