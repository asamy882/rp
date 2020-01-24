import { Routes, RouterModule } from '@angular/router';
import { PurchaseBusinessPlanComponent } from './purchase-business-plan.component';
import { NewOTBComponent } from '../NewOTB/newotb.component';
import { SeasonOTBComponent } from '../seasonotb/seasonotb.component';
import { StoreOTBComponent } from '../storeotb/storeotb.component';
import { FigureViewComponent } from '../FigureView/figure.view.component';
import { CategoryWeightReportComponent } from '../CategoryWeight/category-weight.report.component';

const routes: Routes = [
    { path: 'BusinessPlan', component: PurchaseBusinessPlanComponent },
    { path: 'OTB', component: NewOTBComponent },
    { path: 'SeasonOTB', component: SeasonOTBComponent },
    { path: 'StoreOTB', component: StoreOTBComponent },
    { path: 'FigureView', component: FigureViewComponent },
    { path: 'CategoryWeight', component: CategoryWeightReportComponent },
    { path: 'OTB/view/:taskId', component: NewOTBComponent}
];

export const routing = RouterModule.forChild(routes);
