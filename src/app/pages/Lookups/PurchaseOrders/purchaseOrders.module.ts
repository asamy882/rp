import { NgModule } from "@angular/core";
import { PurchaseOrdersComponent } from "./purchaseOrders.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';
import { PurchaseOrderService } from '../../PurchaseOrder/purchase-order.service';

@NgModule({
    imports: [DialogModule, DataTableModule, CommonModule],
    exports: [PurchaseOrdersComponent],
    declarations: [PurchaseOrdersComponent],
    providers: [PurchaseOrderService],
})
export class PurchaseOrdersLookupModule { }
