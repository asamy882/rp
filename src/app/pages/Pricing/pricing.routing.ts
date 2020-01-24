import { Routes, RouterModule } from '@angular/router';
import { SearchPricingComponent } from './search-pricing/search-pricing.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
    { path: 'searchPricing', component: SearchPricingComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'pricing/edit/:id', component: PricingComponent},
    { path: 'pricing/view/:taskId', component: PricingComponent}
];

export const routing = RouterModule.forChild(routes);
