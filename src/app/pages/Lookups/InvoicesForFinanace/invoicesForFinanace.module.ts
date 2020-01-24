import {NgModule} from "@angular/core";
import {InvoicesForFinanaceComponent} from "./invoicesForFinanace.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [ DialogModule, DataTableModule, CommonModule],
  exports: [InvoicesForFinanaceComponent],
  declarations: [InvoicesForFinanaceComponent],
  providers: [],
})
export class InvoicesForFinanaceLookupModule {
}
