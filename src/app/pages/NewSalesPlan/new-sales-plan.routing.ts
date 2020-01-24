import { Routes, RouterModule } from '@angular/router';
import { NewSalesPlanComponent } from './new-sales-plan.component';

const routes: Routes = [
    { path: '', component: NewSalesPlanComponent }
];

export const routing = RouterModule.forChild(routes);
