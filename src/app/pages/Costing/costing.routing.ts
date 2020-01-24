import {Routes, RouterModule} from '@angular/router';
import {SearchCostingComponent} from "./search-costing/search-costing.Component";
import {CostingComponent} from "./costing/costing.component";


const routes: Routes = [
  {path: 'costing', component: CostingComponent},
  {path: 'costing/edit/:id', component: CostingComponent},
  {path: 'costing/view/:taskId', component: CostingComponent},
  {path: 'searchCosting', component: SearchCostingComponent}
];

export const routing = RouterModule.forChild(routes);
