import { Routes, RouterModule } from '@angular/router';
import { OPEXPlanComponent } from './opex-plan.component';
import { CAPEXPlanComponent } from '../CAPEXPlan/capex-plan.component';

const routes: Routes = [
    { path: 'OPEXPlan', component: OPEXPlanComponent },
    { path: 'CAPEXPlan', component: CAPEXPlanComponent }
];

export const routing = RouterModule.forChild(routes);
