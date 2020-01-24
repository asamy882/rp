import { NgModule } from "@angular/core";
import { ShippersComponent } from "./shippers.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [DialogModule, DataTableModule, CommonModule],
    exports: [ShippersComponent],
    declarations: [ShippersComponent],
    providers: [],
})
export class ShippersLookupModule { }
