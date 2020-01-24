import { NgModule } from "@angular/core";
import { StyleComponent } from "./Style/style.component";
import { UploadStyleFromExcelComponent } from './UploadStyleFromExcel/uploadstylefromexcel.component';
import { routing } from "./styles.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from "../components/grid/grid.module";
import { ShippersLookupModule } from "../Lookups/Shippers/shippers.module";
import { DescriptionModule } from '../Lookups/Description/description.module';
import { GenderModule } from '../Lookups/Gender/gender.module';
import { LineModule } from '../Lookups/Line/line.module';
import { ShipmentNoModule } from '../Lookups/ShipmentNo/shipmentNo.module';
import { SeasonsModule } from '../Lookups/Seasons/seasons.module';
import { StyleService } from './styles.service';
import { AccordionModule,DataTableModule, TabViewModule, CalendarModule, DialogModule, GrowlModule,  } from 'primeng/primeng';

@NgModule({
  imports: [
    AccordionModule,DataTableModule, TabViewModule, CalendarModule, DialogModule, GrowlModule, 
    GenderModule,
    LineModule,
    DescriptionModule,
    ShipmentNoModule,
    SeasonsModule,
    GridModule,
    CommonModule,
    ShippersLookupModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing],
  exports: [StyleComponent,UploadStyleFromExcelComponent],
  declarations: [StyleComponent,UploadStyleFromExcelComponent],
  providers: [StyleService],
})
export class StylesModule {
}
