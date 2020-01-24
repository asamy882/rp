import { ShipmentExpensesReportComponent } from './shipment-expenses-report.component';
import { NgModule } from "@angular/core";
import { ReportModule } from '../../components/report/report.module';
import { routing } from './shipment-expenses-report.routing';




@NgModule({
  imports: [
    ReportModule,routing
  ],
  declarations: [ShipmentExpensesReportComponent],
  exports: [ShipmentExpensesReportComponent]
})
export class ShipmentExpensesReportModule { }
