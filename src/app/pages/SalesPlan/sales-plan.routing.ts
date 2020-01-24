import { Routes, RouterModule } from '@angular/router';
import { SalesPlanComponent } from './sales-plan.component';

const routes: Routes = [
    { path: 'SalesPlan', component: SalesPlanComponent }
];

export const routing = RouterModule.forChild(routes);
