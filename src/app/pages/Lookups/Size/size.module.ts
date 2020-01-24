import {NgModule} from "@angular/core";
import {SizeComponent} from "./size.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [SizeComponent],
  declarations: [SizeComponent],
  providers: [],
})
export class SizeModule {
}
