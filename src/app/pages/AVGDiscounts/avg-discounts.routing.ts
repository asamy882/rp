import { Routes, RouterModule } from '@angular/router';
import { AVGDiscountsComponent } from './avg-discounts.component';

const routes: Routes = [
    { path: '', component: AVGDiscountsComponent }
];

export const routing = RouterModule.forChild(routes);
