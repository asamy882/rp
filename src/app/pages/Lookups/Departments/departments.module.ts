import { NgModule } from "@angular/core";
import { DepartmentsComponent } from "./departments.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [DepartmentsComponent],
    declarations: [DepartmentsComponent],
    providers: [],
})
export class DepartmentsModule { }
