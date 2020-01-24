import {NgModule} from "@angular/core";
import {ClearancesComponent} from "./clearances.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [ClearancesComponent],
  declarations: [ClearancesComponent],
  providers: [],
})
export class ClearancesModule {
}
