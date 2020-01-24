// SearchCommercialInvoiceComponent
import { NgModule } from "@angular/core";
import { CommercialInvoiceComponent } from "./commercial-invoice/commercial-invoice.component";
import { SearchCommercialInvoiceComponent } from "./search-commercial-invoice/search-commercial-invoice.component";
import { routing } from "./CommercialInvoice.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule, TabViewModule, CalendarModule, DialogModule, GrowlModule, ConfirmationService, ConfirmDialogModule, AccordionModule, RadioButtonModule } from 'primeng/primeng';
import { ShippersLookupModule } from "../Lookups/Shippers/shippers.module";
import { CountriesModule } from "../Lookups/Countries/countries.module";
import { VendorsLookupModule } from "../Lookups/Vendors/vendors.module";
import { CurrenciesModule } from "../Lookups/Currencies/currencies.module";
import { FinalDestinationsModule } from "../Lookups/FinalDestinations/finalDestinations.module";
import { PaymentTermsModule } from "../Lookups/PaymentTerms/paymentTerms.module";
import { PortofLoadingsModule } from "../Lookups/PortofLoadings/portofLoadings.module";
import { PurchaseOrdersLookupModule } from "../Lookups/PurchaseOrders/purchaseOrders.module";
import { PrioritiesModule } from "../Lookups/Priorities/priorities.module";
import { CommercialInvoiceService } from './commercial-invoice.service';
import { ReportModule } from '../components/report/report.module';
import { CommercialInvoiceReportComponent } from './commercial-invoice-report/commercial-invoice-report.component';
import { SearchFinanaceCommercialInvoiceComponent } from './search-finanace-commercial-invoice/search-finanace-commercial-invoice.component';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';





@NgModule({
  imports: [
    AccordionModule,
    ConfirmDialogModule,
    ShippersLookupModule,
    CountriesModule,
    VendorsLookupModule,
    CurrenciesModule,
    PurchaseOrdersLookupModule,
    PrioritiesModule,
    PaymentTermsModule,
    PortofLoadingsModule,
    DataTableModule,
    FinalDestinationsModule,
    CalendarModule,
    TabViewModule,
    CommonModule,
    DialogModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    ReportModule,
    WorkflowModule,
    RadioButtonModule,
    routing],
  declarations: [CommercialInvoiceComponent, SearchCommercialInvoiceComponent, CommercialInvoiceReportComponent, SearchFinanaceCommercialInvoiceComponent],
  providers: [CommercialInvoiceService, ConfirmationService, WorkflowService],
  exports: [CommercialInvoiceComponent, SearchCommercialInvoiceComponent, CommercialInvoiceReportComponent, SearchFinanaceCommercialInvoiceComponent]

})
export class CommercialInvoiceModule { }
