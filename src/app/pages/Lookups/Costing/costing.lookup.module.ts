import {NgModule} from "@angular/core";
import {costingLookupComponent} from "./costing.lookup.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [costingLookupComponent],
  declarations: [costingLookupComponent],
  providers: [],
})
export class CostingLookupModule {
}
