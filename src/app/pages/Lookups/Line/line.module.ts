import {NgModule} from "@angular/core";
import {LineComponent} from "./line.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [LineComponent],
  declarations: [LineComponent],
  providers: [],
})
export class LineModule {
}
