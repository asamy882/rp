import { NgModule } from "@angular/core";
import { PortofLoadingsComponent } from "./portofLoadings.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [PortofLoadingsComponent],
    declarations: [PortofLoadingsComponent],
    providers: [],
})
export class PortofLoadingsModule { }
