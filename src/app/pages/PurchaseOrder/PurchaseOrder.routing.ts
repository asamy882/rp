import { Routes, RouterModule } from '@angular/router';
import { SearchPurchaseOrderComponent } from './search-purchase-order/search-purchase-order.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrdersReportComponent } from './purchase-report/purchase-report.component';
import { BulkPurchaseOrderComponent } from './bulk-purchase-order/bulk-purchase-order.component';

const routes: Routes = [
    { path: 'searchPurchaseOrder', component: SearchPurchaseOrderComponent },
    { path: 'BulkPurchaseOrder', component: BulkPurchaseOrderComponent },
    { path: 'purchaseOrder', component: PurchaseOrderComponent },
    { path: 'purchaseOrder/edit/:id', component: PurchaseOrderComponent},
    { path: 'purchaseOrder/view/:taskId', component: PurchaseOrderComponent},
    { path: '', component: PurchaseOrdersReportComponent}
];

export const routing = RouterModule.forChild(routes);
