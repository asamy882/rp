import { NgModule } from "@angular/core";
import { PricingComponent } from "./pricing/pricing.component";
import { SearchPricingComponent } from "./search-pricing/search-pricing.component";
import { routing } from "./pricing.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule, TabViewModule, CalendarModule, DialogModule } from 'primeng/primeng';
import { PricingService } from './pricing.service';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';

import { CostingLookupModule } from "../Lookups/costing/costing.lookup.module";



@NgModule({
  imports: [
    CostingLookupModule,
    DataTableModule,
    WorkflowModule,
    CalendarModule,
    TabViewModule,
    CommonModule,
    DialogModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing],
  declarations: [
    SearchPricingComponent,
    PricingComponent
  ],
  providers: [PricingService, WorkflowService],
  exports: [
    SearchPricingComponent,
    PricingComponent
  ]

})
export class PricingModule { }
