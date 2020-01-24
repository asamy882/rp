import { NgModule } from "@angular/core";
import { SeasonComponent } from "./Season/season.component";
import { routing } from "./seasons.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule, GrowlModule, RadioButtonModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { ShippersLookupModule } from "../Lookups/Shippers/shippers.module";
import { CountriesModule } from '../Lookups/Countries/countries.module';
import { SeasonService } from './seasons.service';

@NgModule({
  imports: [
    DialogModule,
    CountriesModule,
    GridModule,
    CommonModule,
    ShippersLookupModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    RadioButtonModule,
    routing],
  exports: [SeasonComponent],
  declarations: [SeasonComponent],
  providers: [SeasonService],
})
export class SeasonModule {
}
