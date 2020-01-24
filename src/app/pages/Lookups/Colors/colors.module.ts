import {NgModule} from "@angular/core";
import {ColorsComponent} from "./colors.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [ColorsComponent],
  declarations: [ColorsComponent],
  providers: [],
})
export class ColorsModule {
}
