import { ShipmentInvoicesReportComponent } from './shipment-invoices-report.component';
import { NgModule } from "@angular/core";
import { ReportModule } from '../../components/report/report.module';
import { routing } from './shipment-invoices-report.routing';




@NgModule({
  imports: [
    ReportModule,routing
  ],
  declarations: [ShipmentInvoicesReportComponent],
  exports: [ShipmentInvoicesReportComponent]
})
export class ShipmentInvoicesReportModule { }
