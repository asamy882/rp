import {NgModule} from "@angular/core";
import {CurrenciesComponent} from "./currencies.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [CurrenciesComponent],
  declarations: [CurrenciesComponent],
  providers: [],
})
export class CurrenciesModule {
}
