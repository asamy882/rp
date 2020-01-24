import { NgModule } from "@angular/core";
import { ShipmentFromComponent } from "./shipmentFrom.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [ShipmentFromComponent],
    declarations: [ShipmentFromComponent],
    providers: [],
})
export class ShipmentFromModule { }
