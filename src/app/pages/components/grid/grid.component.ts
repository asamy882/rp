import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: "NgGrid",
  templateUrl: "./grid.component.html"
})
export class gridComponent {
  @Input()
  rowData: any;
  @Input()
  colDefinition: any;
  item: any;

  @Output()
  private clickedAdd: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  private clickedEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  private clickedDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  private rowSelected: EventEmitter<any> = new EventEmitter<any>();

  isFilter: boolean;

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  addClicked() {
    this.clickedAdd.emit();
  }

  editClicked() {
    this.clickedEdit.emit();
  }

  deleteClicked() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.clickedDelete.emit();
      }
    });
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  selectedRow(e) {
  //  console.log('selectedRow',this.item);
    this.rowSelected.emit(this.item);
  }
}
