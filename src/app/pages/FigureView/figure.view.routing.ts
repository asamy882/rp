import { Routes, RouterModule } from '@angular/router';
import { FigureViewComponent } from './figure.view.component';

const routes: Routes = [
    { path: '', component: FigureViewComponent }
];

export const routing = RouterModule.forChild(routes);
