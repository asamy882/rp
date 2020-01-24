import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from "../../theme/nga.module";
import { AccordionModule, DialogModule, SharedModule, TabViewModule, DataTableModule, GrowlModule, ConfirmationService, ConfirmDialogModule } from "primeng/primeng";
import { routing } from "./shipment.routing";
import { ShipmentComponent } from "./shipment/shipment.component";
import { SearchShipmentComponent } from "./search-shipment/search-shipment.component";
import { PeriodesModule } from "../Lookups/Periodes/periodes.module";
import { ForwardersLookupModule } from "../Lookups/Forwarders/forwarders.module";
import { GridModule } from "../components/grid/grid.module";
import { FinalDestinationsModule } from '../Lookups/FinalDestinations/finalDestinations.module';
import { InvoicesForShipmentLookupModule } from '../Lookups/InvoicesForShipment/invoicesForShipment.module';
import { PaymentTermsModule } from '../Lookups/PaymentTerms/paymentTerms.module';
import { ShippingTermsModule } from '../Lookups/ShippingTerms/shippingTerms.module';
import { PortofLoadingsModule } from '../Lookups/PortofLoadings/portofLoadings.module';
import { ShipmentFromModule } from '../Lookups/ShipmentFrom/shipmentFrom.module';
import { ShipmentToModule } from '../Lookups/ShipmentTo/shipmentTo.module';
import { ClearancesModule } from '../Lookups/Clearances/clearances.module';
import { CurrenciesModule } from '../Lookups/Currencies/currencies.module';
import { ExpensesModule } from '../Lookups/Expenses/expenses.module';
import { ShipmentService } from './shipment.service';
import { CommercialInvoiceService } from '../CommercialInvoice/commercial-invoice.service';
import { AppTranslationModule } from '../../app.translation.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentsReportComponent } from './shipment-report/shipment-report.component';
import { ReportModule } from '../components/report/report.module';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';

@NgModule({
  imports: [
    ConfirmDialogModule,
    CommonModule,
    AppTranslationModule,
    NgbRatingModule,
    TabViewModule,
    GrowlModule,
    DataTableModule,
    routing,
    AngularFormsModule,
    NgaModule,
    AccordionModule,
    SharedModule,
    DialogModule,
    PeriodesModule,
    ForwardersLookupModule,
    GridModule,
    FinalDestinationsModule,
    InvoicesForShipmentLookupModule,
    PaymentTermsModule,
    PortofLoadingsModule,
    ShipmentFromModule,
    ShipmentToModule,
    ClearancesModule,
    CurrenciesModule,
    ExpensesModule,
    WorkflowModule,
    ShippingTermsModule,
    ReportModule
  ],
  declarations: [
    ShipmentComponent, SearchShipmentComponent, ShipmentsReportComponent
  ],
  exports: [
    ShipmentComponent, SearchShipmentComponent, ShipmentsReportComponent
  ],
  providers: [
    ShipmentService, CommercialInvoiceService, ConfirmationService, WorkflowService
  ]

})
export class ShipmentModule {
}
