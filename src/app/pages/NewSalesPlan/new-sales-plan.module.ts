import { NewSalesPlanComponent } from './new-sales-plan.component';
import { NgModule } from "@angular/core";
import { GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NewSalesPlanService } from './new-sales-plan.service';
import { routing } from "./new-sales-plan.routing";
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';
import { BranchesModule } from '../Lookups/Branches/branches.module';
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';



@NgModule({
  imports: [
    GrowlModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    SeasonsModule,
    BranchesModule,
    PeriodesModule,
    routing
  ],
  declarations: [NewSalesPlanComponent],
  exports: [NewSalesPlanComponent],
  providers: [NewSalesPlanService]
})
export class NewSalesPlanModule {
}
