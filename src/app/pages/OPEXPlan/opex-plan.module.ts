import { OPEXPlanComponent } from './opex-plan.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule, DataListModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { OPEXPlanService } from './opex-plan.service';
import { routing } from "./opex-plan.routing";
import { DepartmentsModule } from '../Lookups/Departments/departments.module';
import { BranchesModule } from '../Lookups/Branches/branches.module';
import { CAPEXPlanComponent } from '../CAPEXPlan/capex-plan.component';
import { CAPEXPlanService } from '../CAPEXPlan/capex-plan.service';
import { CostCenterModule } from '../Lookups/CostCenter/costCenter.module';


@NgModule({
  imports: [
    GrowlModule,
    DataTableModule,
    DataListModule,
    PanelModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    DepartmentsModule,
    AccordionModule,
    RadioButtonModule,
    BranchesModule,
    CostCenterModule,
    routing
  ],
  declarations: [OPEXPlanComponent, CAPEXPlanComponent],
  exports: [OPEXPlanComponent, CAPEXPlanComponent],
  providers: [OPEXPlanService, CAPEXPlanService]
})
export class OPEXPlanModule {
}
