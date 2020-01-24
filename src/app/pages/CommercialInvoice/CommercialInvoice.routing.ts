import { Routes, RouterModule } from '@angular/router';
import { SearchCommercialInvoiceComponent } from './search-commercial-invoice/search-commercial-invoice.component';
import { CommercialInvoiceComponent } from './commercial-invoice/commercial-invoice.component';
import { CommercialInvoiceReportComponent } from './commercial-invoice-report/commercial-invoice-report.component';
import { SearchFinanaceCommercialInvoiceComponent } from './search-finanace-commercial-invoice/search-finanace-commercial-invoice.component';

const routes: Routes = [
  { path: 'searchCommercialInvoice', component: SearchCommercialInvoiceComponent },
  { path: 'InvoicesforFinance', component: SearchFinanaceCommercialInvoiceComponent },
  { path: 'commercialInvoice', component: CommercialInvoiceComponent },
  { path: 'commercialInvoice/edit/:id', component: CommercialInvoiceComponent },
  { path: 'commercialInvoice/view/:taskId', component: CommercialInvoiceComponent },
  { path: '', component: CommercialInvoiceReportComponent }
];

export const routing = RouterModule.forChild(routes);
