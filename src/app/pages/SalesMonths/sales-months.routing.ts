import { Routes, RouterModule } from '@angular/router';
import { SalesMonthsComponent } from './sales-months.component';

const routes: Routes = [
    { path: '', component: SalesMonthsComponent }
];

export const routing = RouterModule.forChild(routes);
