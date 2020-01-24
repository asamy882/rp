import { TrackerReportComponent } from '../tracker-report/tracker-report.component';
import { NgModule } from "@angular/core";
import { ReportModule } from '../../components/report/report.module';
import { routing } from './tracker.routing';




@NgModule({
  imports: [
    ReportModule,routing
  ],
  declarations: [TrackerReportComponent],
  exports: [TrackerReportComponent]
})
export class TrackerModule { }
