import {NgModule} from "@angular/core";
import {LookupComponent} from "./lookup.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [LookupComponent],
  declarations: [LookupComponent],
  providers: [],
})
export class ColorsModule {
}
