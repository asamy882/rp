import { SalesPlanMonthHeaderComponent } from 'app/pages/components/sales-plan-month-header/sales-plan-month-header';
import { NgModule } from "@angular/core";
import { NgaModule } from "../../../theme/nga.module";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    NgaModule
  ],
  declarations: [SalesPlanMonthHeaderComponent],
  exports: [SalesPlanMonthHeaderComponent],
  providers: []
})
export class SalesPlanMonthHeaderModule {
}
