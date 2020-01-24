import {TrendForecastingComponent} from './trend.forecasting.component';
import {NgModule} from "@angular/core";
import {DataTableModule} from 'primeng/primeng';
import {NgaModule} from "../../theme/nga.module";
import {CommonModule} from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { TrendForecastingService } from './trend.forecasting.service';
import { routing } from "./trend.forecasting.routing";
import { BranchesModule } from '../Lookups/Branches/branches.module';
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';



@NgModule({
  imports: [
    DataTableModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    BranchesModule,
    PeriodesModule,
    routing
  ],
  declarations: [TrendForecastingComponent],
  exports: [TrendForecastingComponent],
  providers: [TrendForecastingService]
})
export class TrendForecastingModule {
}
