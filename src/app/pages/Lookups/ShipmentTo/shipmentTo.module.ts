import { NgModule } from "@angular/core";
import { ShipmentToComponent } from "./shipmentTo.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [ShipmentToComponent],
    declarations: [ShipmentToComponent],
    providers: [],
})
export class ShipmentToModule { }
