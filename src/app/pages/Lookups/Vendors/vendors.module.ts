import {DialogModule, DataTableModule} from 'primeng/primeng';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {VendorsComponent} from "./vendors.component";

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [VendorsComponent],
  declarations: [VendorsComponent],
  providers: [],
})
export class VendorsLookupModule {
}
