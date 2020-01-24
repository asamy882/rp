import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';
import {ForwardersComponent} from "./forwarders.component";

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [ForwardersComponent],
  declarations: [ForwardersComponent],
  providers: [],
})
export class ForwardersLookupModule {
}
