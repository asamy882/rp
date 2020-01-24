import {Component, OnInit} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Expenses';
    this.lookupUrl = 'expense/getall';
    this.colDefinition = [{field: 'Id', header: 'Id'},
      {field: 'Name', header: 'Name'},
      {field: 'EffectOnItemCost', header: 'Effect On Item Cost'}];
    super.ngOnInit();
  }

}
