import { Routes, RouterModule } from '@angular/router';
import { SearchPrePurchaseOrderComponent } from './search-pre-purchase-order/search-pre-purchase-order.component';
import { PrePurchaseOrderComponent } from './pre-purchase-order/pre-purchase-order.component';
import { PrePurchaseOrdersReportComponent} from './pre-purchase-report/pre-purchase-report.component';

const routes: Routes = [
    { path: 'searchPrePurchaseOrder', component: SearchPrePurchaseOrderComponent },
    { path: 'prePurchaseOrder', component: PrePurchaseOrderComponent },
    { path: 'prePurchaseOrder/edit/:id', component: PrePurchaseOrderComponent},
    { path: 'prePurchaseOrder/view/:id', component: PrePurchaseOrderComponent},
    { path: '', component: PrePurchaseOrdersReportComponent}
];

export const routing = RouterModule.forChild(routes);
