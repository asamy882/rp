import {NgModule} from "@angular/core";
import {COOComponent} from "./coo.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [COOComponent],
  declarations: [COOComponent],
  providers: [],
})
export class COOModule {
}
