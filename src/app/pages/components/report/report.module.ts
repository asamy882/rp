import {ReportComponent} from 'app/pages/components/report/report.component';
import {NgModule} from "@angular/core";
import {DataTableModule} from 'primeng/primeng';
import {NgaModule} from "../../../theme/nga.module";
import {CommonModule} from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { ReportService } from './report.service';


@NgModule({
  imports: [
    DataTableModule,
    CommonModule,
    AngularFormsModule,
    NgaModule
  ],
  declarations: [ReportComponent],
  exports: [ReportComponent],
  providers: [ReportService]
})
export class ReportModule {
}
