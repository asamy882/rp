import { SalesMonthsComponent } from './sales-months.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule, DataListModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { SalesMonthsService } from './sales-months.service';
import { routing } from "./sales-months.routing";
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';
import { BranchesModule } from '../Lookups/Branches/branches.module';


@NgModule({
  imports: [
    GrowlModule,
    DataTableModule,
    DataListModule,
    PanelModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    PeriodesModule,
    AccordionModule,
    RadioButtonModule,
    BranchesModule,
    routing
  ],
  declarations: [SalesMonthsComponent],
  exports: [SalesMonthsComponent],
  providers: [SalesMonthsService]
})
export class SalesMonthsModule {
}
