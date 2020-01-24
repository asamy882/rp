import { NgModule } from "@angular/core";
import { CostCenterComponent } from "./costCenter.component";
import { CommonModule } from "@angular/common";
import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [CostCenterComponent],
  declarations: [CostCenterComponent],
  providers: [],
})
export class CostCenterModule {
}
