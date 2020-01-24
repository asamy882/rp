// SearchPrePurchaseOrderComponent
import { NgModule } from "@angular/core";
import { PrePurchaseOrderComponent } from "./pre-purchase-order/pre-purchase-order.component";
import { SearchPrePurchaseOrderComponent } from "./search-pre-purchase-order/search-pre-purchase-order.component";
import { routing } from "./prePurchaseOrder.routing";
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
import { PrePurchaseOrderService } from './pre-purchase-order.service';
import { InvoicesForFinanaceLookupModule } from '../Lookups/InvoicesForFinanace/invoicesForFinanace.module';
import { PrePurchaseOrdersReportComponent } from './pre-purchase-report/pre-purchase-report.component';
import { ReportModule } from '../components/report/report.module';
import { ReadCSVFileModule } from '../components/read-csv-file/read-csv-file.module';
import { StylesLookupModule } from '../Lookups/Styles/styles.module';
import { COOModule } from '../Lookups/Coo/coo.module';




@NgModule({
  imports: [
    ConfirmDialogModule,
    ColorsModule,
    SizeModule,
    VendorsLookupModule,
    CurrenciesModule,
    GenderModule,
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
    routing],
  declarations: [SearchPrePurchaseOrderComponent, PrePurchaseOrderComponent, PrePurchaseOrdersReportComponent],
  providers: [PrePurchaseOrderService, ConfirmationService ],
  exports: [SearchPrePurchaseOrderComponent, PrePurchaseOrderComponent, PrePurchaseOrdersReportComponent]

})
export class PrePurchaseOrderModule { }
