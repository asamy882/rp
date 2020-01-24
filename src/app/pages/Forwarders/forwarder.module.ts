import { NgModule } from "@angular/core";
import { ForwarderComponent } from "./Forwarder/forwarder.component";
import { routing } from "./forwarders.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule,GrowlModule } from "primeng/primeng";
import { GridModule } from "../components/grid/grid.module";
import { ShippersLookupModule } from "../Lookups/Shippers/shippers.module";
import { CountriesModule } from '../Lookups/Countries/countries.module';
import { ForwarderService } from './forwarders.service';

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
  exports: [ForwarderComponent],
  declarations: [ForwarderComponent],
  providers: [ForwarderService],
})
export class ForwarderModule {
}
