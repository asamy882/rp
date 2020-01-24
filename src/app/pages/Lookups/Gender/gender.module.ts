import { NgModule } from "@angular/core";
import { GenderComponent } from "./gender.component";
import {CommonModule} from "@angular/common";
import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
    imports: [DialogModule, DataTableModule, CommonModule],
    exports: [GenderComponent],
    declarations: [GenderComponent],
    providers: [],
})
export class GenderModule { }
