import { Routes, RouterModule } from '@angular/router';
import { ForwarderComponent } from './Forwarder/forwarder.component';

const routes: Routes = [
    { path: '', component: ForwarderComponent }
];

export const routing = RouterModule.forChild(routes);
