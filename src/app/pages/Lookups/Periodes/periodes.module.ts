import {NgModule} from "@angular/core";
import {PeriodesComponent} from "./periodes.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [PeriodesComponent],
  declarations: [PeriodesComponent],
  providers: [],
})
export class PeriodesModule {
}
