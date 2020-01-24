import {NgModule} from "@angular/core";
import {PaymentStatusComponent} from "./paymentStatus.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [PaymentStatusComponent],
  declarations: [PaymentStatusComponent],
  providers: [],
})
export class PaymentStatusModule {
}
