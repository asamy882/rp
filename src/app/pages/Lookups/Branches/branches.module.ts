import { NgModule } from "@angular/core";
import { BranchesComponent } from "./branches.component";
import { CommonModule } from "@angular/common";
import { DialogModule, DataTableModule } from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [BranchesComponent],
  declarations: [BranchesComponent],
  providers: [],
})
export class BranchesModule {
}
