// SearchPrePurchaseOrderComponent
import { NgModule } from "@angular/core";
import { BPPurchaseRequestComponent } from "./BP-Purchase-Request/BPPurchaseRequest.component";
import { SearchBPPurchaseRequestComponent } from "./search-BP-Purchase-Request/search-BP-Purchase-Request.component";
import { routing } from "./BPPurchaseRequest.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule, TabViewModule, CalendarModule, DialogModule, GrowlModule, ConfirmationService, ConfirmDialogModule, FileUploadModule } from 'primeng/primeng';
import { ColorsModule } from "../Lookups/Colors/colors.module";
import { SizeModule } from "../Lookups/Size/size.module";
import { VendorsLookupModule } from "../Lookups/Vendors/vendors.module";
import { CurrenciesModule } from "../Lookups/Currencies/currencies.module";
import { DescriptionModule } from "../Lookups/Description/description.module";
import { GenderModule } from "../Lookups/Gender/gender.module";
import { PeriodesModule } from "../Lookups/Periodes/periodes.module";
import { PurchaseOrdersLookupModule } from "../Lookups/PurchaseOrders/purchaseOrders.module";
import { BPPurchaseRequestService } from './BPPurchaseRequest.service';
import { InvoicesForFinanaceLookupModule } from '../Lookups/InvoicesForFinanace/invoicesForFinanace.module';
import { ReportModule } from '../components/report/report.module';
import { ReadCSVFileModule } from '../components/read-csv-file/read-csv-file.module';
import { StylesLookupModule } from '../Lookups/Styles/styles.module';
import { COOModule } from '../Lookups/Coo/coo.module';
import { PrioritiesModule } from "../Lookups/Priorities/priorities.module";
import { LineModule } from '../Lookups/Line/line.module';




@NgModule({
  imports: [
    ConfirmDialogModule,
    ColorsModule,
    SizeModule,
    VendorsLookupModule,
    CurrenciesModule,
    GenderModule,
    LineModule,
    PeriodesModule,
    DataTableModule,
    DescriptionModule,
    CalendarModule,
    TabViewModule,
    CommonModule,
    DialogModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    PurchaseOrdersLookupModule,
    InvoicesForFinanaceLookupModule,
    ReadCSVFileModule,
    ReportModule,
    FileUploadModule,
    COOModule,
    StylesLookupModule,
    PrioritiesModule,
    routing],
  declarations: [SearchBPPurchaseRequestComponent, BPPurchaseRequestComponent],
  providers: [BPPurchaseRequestService, ConfirmationService ],
  exports: [SearchBPPurchaseRequestComponent, BPPurchaseRequestComponent]

})
export class BPPurchaseRequestModule { }
