import { Component } from "@angular/core";


@Component({
  selector: "app-pre-purchase-report",
  templateUrl: "./pre-purchase-report.component.html",
  styleUrls: ["./pre-purchase-report.component.css"]
})
export class PrePurchaseOrdersReportComponent  {

  url: string ="Reports/GetPrePurchaseOrdersReport";

}
