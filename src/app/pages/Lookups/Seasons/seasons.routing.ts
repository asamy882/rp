import { Routes, RouterModule } from '@angular/router';
import { SeasonsComponent } from './seasons.component';


const routes: Routes = [
    { path: '', component: SeasonsComponent },
];

export const routing = RouterModule.forChild(routes);
