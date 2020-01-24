import { AVGDiscountsComponent } from './avg-discounts.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule, DataListModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AVGDiscountsService } from './avg-discounts.service';
import { routing } from "./avg-discounts.routing";
import { PeriodesModule } from '../Lookups/Periodes/periodes.module';


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
    routing
  ],
  declarations: [AVGDiscountsComponent],
  exports: [AVGDiscountsComponent],
  providers: [AVGDiscountsService]
})
export class AVGDiscountsModule {
}
