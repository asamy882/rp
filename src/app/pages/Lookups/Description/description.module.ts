import {NgModule} from "@angular/core";
import {DescriptionComponent} from "./description.component";
import {CommonModule} from "@angular/common";

import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [DescriptionComponent],
  declarations: [DescriptionComponent],
  providers: [],
})
export class DescriptionModule {
}
