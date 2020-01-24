import { Routes, RouterModule } from '@angular/router';
import { PaymentTermComponent } from './PaymentTerm/paymentTerm.component';

const routes: Routes = [
    { path: '', component: PaymentTermComponent }
];

export const routing = RouterModule.forChild(routes);
