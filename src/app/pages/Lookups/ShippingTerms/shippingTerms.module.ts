import {NgModule} from "@angular/core";
import {ShippingTermsComponent} from "./shippingTerms.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [ShippingTermsComponent],
  declarations: [ShippingTermsComponent],
  providers: [],
})
export class ShippingTermsModule {
}
