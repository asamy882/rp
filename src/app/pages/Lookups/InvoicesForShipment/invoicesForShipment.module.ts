import {NgModule} from "@angular/core";
import {InvoicesForShipmentComponent} from "./invoicesForShipment.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [ DialogModule, DataTableModule, CommonModule],
  exports: [InvoicesForShipmentComponent],
  declarations: [InvoicesForShipmentComponent],
  providers: [],
})
export class InvoicesForShipmentLookupModule {
}
