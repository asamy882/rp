import { Routes, RouterModule } from "@angular/router";
import { ShipmentComponent } from "./shipment/shipment.component";
import { SearchShipmentComponent } from './search-shipment/search-shipment.component';
import { ShipmentsReportComponent } from './shipment-report/shipment-report.component';

const routes: Routes = [
  { path: 'shipment', component: ShipmentComponent },
  { path: 'searchShipment', component: SearchShipmentComponent },
  { path: 'shipment/edit/:id', component: ShipmentComponent },
  { path: 'shipment/view/:taskId', component: ShipmentComponent },
  { path: '', component: ShipmentsReportComponent }
];

export const routing = RouterModule.forChild(routes);
