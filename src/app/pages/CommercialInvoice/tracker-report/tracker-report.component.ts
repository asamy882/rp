import { Component } from "@angular/core";

@Component({
  selector: "app-tracker-report",
  templateUrl: "./tracker-report.component.html",
  styleUrls: ["./tracker-report.component.css"]
})
export class TrackerReportComponent {

  url: string = "Reports/GetTrackerReport";

}
