import { NgModule } from "@angular/core";
import { SeasonsComponent } from "./seasons.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [SeasonsComponent],
    declarations: [SeasonsComponent],
    providers: [],
})
export class SeasonsModule { }
