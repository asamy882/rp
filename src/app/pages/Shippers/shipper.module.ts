import { NgModule } from "@angular/core";
import { ShipperComponent } from "./Shipper/shipper.component";
import { routing } from "./shippers.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule,GrowlModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { VendorsLookupModule } from "../Lookups/Vendors/vendors.module";
import { CountriesModule } from '../Lookups/Countries/countries.module';
import { ShipperService } from './shippers.service';

@NgModule({
  imports: [
    DialogModule,
    CountriesModule,
    GridModule,
    CommonModule,
    VendorsLookupModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    routing],
  exports: [ShipperComponent],
  declarations: [ShipperComponent],
  providers: [ShipperService],
})
export class ShippersModule {
}
