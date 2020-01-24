import { Routes, RouterModule } from '@angular/router';
import { VendorComponent } from './Vendor/vendor.component';

const routes: Routes = [
    { path: '', component: VendorComponent }
];

export const routing = RouterModule.forChild(routes);
