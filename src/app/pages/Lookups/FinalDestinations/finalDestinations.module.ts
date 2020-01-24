import { NgModule } from "@angular/core";
import { FinalDestinationsComponent } from "./finalDestinations.component";
import {CommonModule} from "@angular/common";

import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [ DialogModule, DataTableModule, CommonModule],
    exports: [FinalDestinationsComponent],
    declarations: [FinalDestinationsComponent],
    providers: [],
})
export class FinalDestinationsModule { }
