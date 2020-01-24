import { NgModule } from "@angular/core";
import { PrioritiesComponent } from "./priorities.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [PrioritiesComponent],
    declarations: [PrioritiesComponent],
    providers: [],
})
export class PrioritiesModule { }
