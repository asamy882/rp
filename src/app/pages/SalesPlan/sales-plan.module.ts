import { SalesPlanComponent } from './sales-plan.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule, DataListModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { SalesPlanService } from './sales-plan.service';
import { routing } from "./sales-plan.routing";
import { DescriptionModule } from '../Lookups/Description/description.module';
import { GenderModule } from '../Lookups/Gender/gender.module';
import { LineModule } from '../Lookups/Line/line.module';
import { ShipmentNoModule } from '../Lookups/ShipmentNo/shipmentNo.module';
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';
import { BranchesModule } from '../Lookups/Branches/branches.module';
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';
import { SalesPlanMonthHeaderModule } from '../components/sales-plan-month-header/sales-plan-month-header.module';
import { SalesPlanMonthModule } from '../components/sales-plan-month/sales-plan-month.module';


@NgModule({
  imports: [
    GrowlModule,
    DataTableModule,
    DataListModule,
    PanelModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    GenderModule,
    LineModule,
    DescriptionModule,
    ShipmentNoModule,
    SeasonsModule,
    AccordionModule,
    RadioButtonModule,
    BranchesModule,
    PeriodesModule,
    SalesPlanMonthHeaderModule,
    SalesPlanMonthModule,
    routing
  ],
  declarations: [SalesPlanComponent],
  exports: [SalesPlanComponent],
  providers: [SalesPlanService]
})
export class SalesPlanModule {
}
