import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './Supplier/supplier.component';

const routes: Routes = [
    { path: '', component: SupplierComponent }
];

export const routing = RouterModule.forChild(routes);
