import { MovingReportComponent } from './moving.report.component';
import { NgModule } from "@angular/core";
import { DataGridModule, PanelModule, AccordionModule, RadioButtonModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { MovingReportService } from './moving.report.service';
import { routing } from "./moving.search.routing";
import { DescriptionModule } from '../Lookups/Description/description.module';
import { GenderModule } from '../Lookups/Gender/gender.module';
import { LineModule } from '../Lookups/Line/line.module';
import { ShipmentNoModule } from '../Lookups/ShipmentNo/shipmentNo.module';
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';

@NgModule({
  imports: [
    DataGridModule,
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
    routing
  ],
  declarations: [MovingReportComponent],
  exports: [MovingReportComponent],
  providers: [MovingReportService]
})
export class MovingReportModule {
}
