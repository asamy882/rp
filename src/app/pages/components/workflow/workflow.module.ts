import { WorkflowComponent } from 'app/pages/components/workflow/workflow.component';
import { NgModule } from "@angular/core";
import { DataTableModule, GrowlModule } from 'primeng/primeng';
import { NgaModule } from "../../../theme/nga.module";
import { CommonModule } from "@angular/common";
import { WorkflowService } from './workflow.service';
import { FormsModule as AngularFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    DataTableModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    GrowlModule
  ],
  declarations: [WorkflowComponent],
  exports: [WorkflowComponent],
  providers: [WorkflowService]
})
export class WorkflowModule {
}
