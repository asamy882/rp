import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';
@Component({
  selector: 'app-paymentStatus',
  templateUrl: './paymentStatus.component.html',
  styleUrls: ['./paymentStatus.component.css']
})
export class PaymentStatusComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'PaymentStatus';
    this.lookupUrl = '';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'}];
    this.items = [{ Id : '1', Name : 'NotPaid' },
    { Id : '2', Name : 'Paid' }];
  }

}
