import { NgModule } from "@angular/core";
import { PrePurchaseOrdersComponent } from "./prePurchaseOrders.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [DialogModule, DataTableModule, CommonModule],
    exports: [PrePurchaseOrdersComponent],
    declarations: [PrePurchaseOrdersComponent],
    providers: [],
})
export class PrePurchaseOrdersLookupModule { }
