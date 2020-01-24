import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: "sales-plan-month",
  templateUrl: "./sales-plan-month.html"
})
export class SalesPlanMonthComponent {
  @Input()
  rowData: any;
  @Input()
  orginalPrice: any;
  @Input()
  rowDataId: any;
  @Output()
  private valueChanged: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  onChange() {
    //  console.log('selectedRow',this.item);
     this.rowData.Amount = this.rowData.Dicount > 0 ? (this.orginalPrice * (100 - this.rowData.Dicount) / 100 * this.rowData.Qty) : this.orginalPrice * this.rowData.Qty;
      this.valueChanged.emit(this.rowDataId);
    }

}
