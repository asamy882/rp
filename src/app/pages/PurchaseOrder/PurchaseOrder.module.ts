// SearchPurchaseOrderComponent
import { NgModule } from "@angular/core";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { SearchPurchaseOrderComponent } from "./search-purchase-order/search-purchase-order.component";
import { routing } from "./PurchaseOrder.routing";
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule, TabViewModule, CalendarModule, DialogModule, GrowlModule, ConfirmationService, ConfirmDialogModule, AccordionModule } from 'primeng/primeng';
import { ColorsModule } from "../Lookups/Colors/colors.module";
import { SizeModule } from "../Lookups/Size/size.module";
import { VendorsLookupModule } from "../Lookups/Vendors/vendors.module";
import { CurrenciesModule } from "../Lookups/Currencies/currencies.module";
import { DescriptionModule } from "../Lookups/Description/description.module";
import { GenderModule } from "../Lookups/Gender/gender.module";
import { SeasonsModule } from "../Lookups/Seasons/seasons.module";
import { LineModule } from "../Lookups/Line/line.module";
import { ShipmentNoModule } from "../Lookups/ShipmentNo/shipmentNo.module";
import { PrePurchaseOrdersLookupModule } from "../Lookups/PrePurchaseOrders/prePurchaseOrders.module";
import { PurchaseOrderService } from './purchase-order.service';
import { WorkflowModule } from '../components/workflow/workflow.module';
import { WorkflowService } from '../components/workflow/workflow.service';
import { PurchaseOrdersReportComponent } from './purchase-report/purchase-report.component';
import { BulkPurchaseOrderComponent } from './bulk-purchase-order/bulk-purchase-order.component';
import { ReportModule } from '../components/report/report.module';
import { StylesLookupModule } from '../Lookups/Styles/styles.module';
import { COOModule } from '../Lookups/Coo/coo.module';
import { ReadCSVFileModule } from '../components/read-csv-file/read-csv-file.module';


@NgModule({
  imports: [
    ColorsModule,
    SizeModule,
    VendorsLookupModule,
    CurrenciesModule,
    LineModule,
    ShipmentNoModule,
    GenderModule,
    SeasonsModule,
    DataTableModule,
    DescriptionModule,
    CalendarModule,
    TabViewModule,
    CommonModule,
    DialogModule,
    AccordionModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    GrowlModule,
    PrePurchaseOrdersLookupModule,
    ConfirmDialogModule,
    WorkflowModule,
    ReportModule,
    StylesLookupModule,
    COOModule,
    ReadCSVFileModule,
    routing],
  declarations: [SearchPurchaseOrderComponent, PurchaseOrderComponent, PurchaseOrdersReportComponent, BulkPurchaseOrderComponent],
  providers: [PurchaseOrderService, ConfirmationService, WorkflowService],
  exports: [SearchPurchaseOrderComponent, PurchaseOrderComponent, PurchaseOrdersReportComponent, BulkPurchaseOrderComponent]

})
export class PurchaseOrderModule { }
