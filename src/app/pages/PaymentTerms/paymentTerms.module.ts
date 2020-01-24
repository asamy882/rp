import { NgModule } from "@angular/core";
import { PaymentTermComponent } from "./PaymentTerm/paymentTerm.component";
import { routing } from "./paymentTerms.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule,GrowlModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { ShippersLookupModule } from "../Lookups/Shippers/shippers.module";
import { CountriesModule } from '../Lookups/Countries/countries.module';
import { PaymentTermService } from './paymentTerms.service';

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
    routing],
  exports: [PaymentTermComponent],
  declarations: [PaymentTermComponent],
  providers: [PaymentTermService],
})
export class PaymentTermsModule {
}
