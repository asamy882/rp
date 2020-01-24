import {NgModule} from "@angular/core";
import {ShipmentsForCostingComponent} from "./shipmentsForCosting.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [ DialogModule, DataTableModule, CommonModule],
  exports: [ShipmentsForCostingComponent],
  declarations: [ShipmentsForCostingComponent],
  providers: [],
})
export class ShipmentsForCostingLookupModule {
}
