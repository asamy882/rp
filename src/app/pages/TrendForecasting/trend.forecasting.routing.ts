import { Routes, RouterModule } from '@angular/router';
import { TrendForecastingComponent } from './trend.forecasting.component';

const routes: Routes = [
    { path: '', component: TrendForecastingComponent }
];

export const routing = RouterModule.forChild(routes);
