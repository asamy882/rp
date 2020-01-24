import { PurchaseBusinessPlanComponent } from './purchase-business-plan.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule, DataListModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { PurchaseBusinessPlanService } from './purchase-business-plan.service';
import { routing } from "./purchase-business-plan.routing";
import { DescriptionModule } from '../Lookups/Description/description.module';
import { GenderModule } from '../Lookups/Gender/gender.module';
import { LineModule } from '../Lookups/Line/line.module';
import { ShipmentNoModule } from '../Lookups/ShipmentNo/shipmentNo.module';
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';
import { BranchesModule } from '../Lookups/Branches/branches.module';
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';
import { NewOTBComponent } from '../NewOTB/newotb.component';
import { NewOTBService } from '../NewOTB/newotb.service';
import { FigureViewComponent } from '../FigureView/figure.view.component';
import { FigureViewService } from '../FigureView/figure.view.service';
import { CategoryWeightReportComponent } from '../CategoryWeight/category-weight.report.component';
import { CategoryWeightReportService } from '../CategoryWeight/category-weight.report.service';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';
import { SeasonOTBComponent } from '../seasonotb/seasonotb.component';
import { SeasonOTBService } from '../seasonotb/seasonotb.service';
import { StoreOTBComponent } from '../storeotb/storeotb.component';
import { StoreOTBService } from '../storeotb/storeotb.service';



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
    WorkflowModule,
    routing
  ],
  declarations: [PurchaseBusinessPlanComponent, NewOTBComponent,SeasonOTBComponent,StoreOTBComponent,FigureViewComponent,CategoryWeightReportComponent],
  exports: [PurchaseBusinessPlanComponent, NewOTBComponent,SeasonOTBComponent,StoreOTBComponent,FigureViewComponent,CategoryWeightReportComponent],
  providers: [PurchaseBusinessPlanService, NewOTBService,SeasonOTBService,StoreOTBService, WorkflowService,FigureViewService,CategoryWeightReportService]
})
export class PurchaseBusinessPlanModule {
}
