import { CategoryWeightReportComponent } from './category-weight.report.component';
import { NgModule } from "@angular/core";
import { DataTableModule, PanelModule, AccordionModule, RadioButtonModule,DataListModule } from 'primeng/primeng';
import { NgaModule } from "../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { CategoryWeightReportService } from './category-weight.report.service';
import { routing } from "./category-weight.report.routing";
import { DescriptionModule } from '../Lookups/Description/description.module';
import { GenderModule } from '../Lookups/Gender/gender.module';
import { LineModule } from '../Lookups/Line/line.module';
import { ShipmentNoModule } from '../Lookups/ShipmentNo/shipmentNo.module';
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';

@NgModule({
  imports: [
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
    routing
  ],
  declarations: [],
  exports: [],
  providers: [CategoryWeightReportService]
})
export class CategoryWeightReportModule {
}
