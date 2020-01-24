import {NgModule} from "@angular/core";
import {SuppliersComponent} from "./suppliers.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [SuppliersComponent],
  declarations: [SuppliersComponent],
  providers: [],
})
export class SuppliersLookupModule {
}
