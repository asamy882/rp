import { SalesPlanMonthComponent } from 'app/pages/components/sales-plan-month/sales-plan-month';
import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    AngularFormsModule
  ],
  declarations: [SalesPlanMonthComponent],
  exports: [SalesPlanMonthComponent],
  providers: []
})
export class SalesPlanMonthModule {
}
