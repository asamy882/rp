import { Routes, RouterModule } from '@angular/router';
import { ShipperComponent } from './Shipper/shipper.component';

const routes: Routes = [
    { path: '', component: ShipperComponent }
];

export const routing = RouterModule.forChild(routes);
