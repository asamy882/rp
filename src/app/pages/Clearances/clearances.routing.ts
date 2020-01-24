import { Routes, RouterModule } from '@angular/router';
import { ClearanceComponent } from './Clearance/clearance.component';

const routes: Routes = [
    { path: '', component: ClearanceComponent }
];

export const routing = RouterModule.forChild(routes);
