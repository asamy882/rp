import { Routes, RouterModule } from '@angular/router';
import { SeasonComponent } from './Season/season.component';

const routes: Routes = [
    { path: '', component: SeasonComponent }
];

export const routing = RouterModule.forChild(routes);
