import { Routes, RouterModule } from '@angular/router';
import { CategoryWeightReportComponent } from './category-weight.report.component';

const routes: Routes = [
    { path: '', component: CategoryWeightReportComponent }
];

export const routing = RouterModule.forChild(routes);
