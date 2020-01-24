import {NgModule} from "@angular/core";
import {StylesComponent} from "./styles.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [StylesComponent],
  declarations: [StylesComponent],
  providers: [],
})
export class StylesLookupModule {
}
