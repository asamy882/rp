import { gridComponent } from 'app/pages/components/grid/grid.component';
import { NgModule } from "@angular/core";
import { DataTableModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { NgaModule } from "../../../theme/nga.module";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    DataTableModule,
    CommonModule,
    ConfirmDialogModule,
    NgaModule
  ],
  declarations: [gridComponent],
  exports: [gridComponent],
  providers: [ConfirmationService]
})
export class GridModule {
}
