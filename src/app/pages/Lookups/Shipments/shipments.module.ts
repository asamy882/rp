import {NgModule} from "@angular/core";
import {ShipmentsComponent} from "./shipments.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [ DialogModule, DataTableModule, CommonModule],
  exports: [ShipmentsComponent],
  declarations: [ShipmentsComponent],
  providers: [],
})
export class ShipmentsLookupModule {
}
