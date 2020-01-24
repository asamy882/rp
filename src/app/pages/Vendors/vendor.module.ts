import { NgModule } from "@angular/core";
import { VendorComponent } from "./Vendor/vendor.component";
import { routing } from "./vendors.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule, GrowlModule, AccordionModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { SuppliersLookupModule } from "../Lookups/Suppliers/suppliers.module";
import { CountriesModule } from '../Lookups/Countries/countries.module';
import { VendorService } from './vendors.service';
import { PaymentTermsModule } from '../Lookups/PaymentTerms/paymentTerms.module';

@NgModule({
  imports: [
    DialogModule,
    CountriesModule,
    GridModule,
    CommonModule,
    SuppliersLookupModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    PaymentTermsModule,
    AccordionModule,
    routing],
  exports: [VendorComponent],
  declarations: [VendorComponent],
  providers: [VendorService],
})
export class VendorsModule {
}
