import { Routes, RouterModule } from '@angular/router';
import { MovingReportComponent } from './moving.report.component';

const routes: Routes = [
    { path: '', component: MovingReportComponent }
];

export const routing = RouterModule.forChild(routes);
