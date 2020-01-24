import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CostingComponent } from "./costing/costing.component";
import { SearchCostingComponent } from "./search-costing/search-costing.Component";
import { routing } from "./costing.routing";
import { CalendarModule, ConfirmationService, ConfirmDialogModule, DataTableModule, DialogModule, TabViewModule, AccordionModule,GrowlModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { ShipmentsForCostingLookupModule } from "../Lookups/ShipmentsForCosting/shipmentsForCosting.module";
import { CostingService } from './costing.service';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';


@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    AngularFormsModule,
    AppTranslationModule,
    CalendarModule,
    NgaModule,
    NgbRatingModule,
    GridModule,
    DialogModule,
    ConfirmDialogModule,
    ShipmentsForCostingLookupModule,
    DataTableModule,
    TabViewModule,
    GrowlModule,
    WorkflowModule,
    routing],
  exports: [
    CostingComponent,
    SearchCostingComponent
  ],
  declarations: [
    CostingComponent,
    SearchCostingComponent
  ],
  providers: [CostingService, ConfirmationService, WorkflowService]
})
export class CostingModule {
}
