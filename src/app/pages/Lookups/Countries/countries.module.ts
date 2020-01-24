import {NgModule} from "@angular/core";
import {CountriesComponent} from "./countries.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [CountriesComponent],
  declarations: [CountriesComponent],
  providers: [],
})
export class CountriesModule {
}
