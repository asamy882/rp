import { NgModule } from "@angular/core";
import { ShipmentNoComponent } from "./shipmentNo.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [ShipmentNoComponent],
    declarations: [ShipmentNoComponent],
    providers: [],
})
export class ShipmentNoModule { }
