import {NgModule} from "@angular/core";
import {PaymentTermsComponent} from "./paymentTerms.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [PaymentTermsComponent],
  declarations: [PaymentTermsComponent],
  providers: [],
})
export class PaymentTermsModule {
}
