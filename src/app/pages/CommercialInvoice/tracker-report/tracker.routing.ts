import { Routes, RouterModule } from '@angular/router';
import { TrackerReportComponent } from '../tracker-report/tracker-report.component';


const routes: Routes = [
  { path: '', component: TrackerReportComponent }
];

export const routing = RouterModule.forChild(routes);
