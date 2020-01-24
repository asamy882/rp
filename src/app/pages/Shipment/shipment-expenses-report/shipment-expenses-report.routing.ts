import { Routes, RouterModule } from '@angular/router';
import { ShipmentExpensesReportComponent } from './shipment-expenses-report.component';


const routes: Routes = [
  { path: '', component: ShipmentExpensesReportComponent }
];

export const routing = RouterModule.forChild(routes);
