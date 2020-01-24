import { Routes, RouterModule } from '@angular/router';
import { ShipmentInvoicesReportComponent } from './shipment-invoices-report.component';


const routes: Routes = [
  { path: '', component: ShipmentInvoicesReportComponent }
];

export const routing = RouterModule.forChild(routes);
