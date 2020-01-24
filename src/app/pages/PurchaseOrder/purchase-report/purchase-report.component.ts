import { Component } from "@angular/core";


@Component({
  selector: "app-purchase-report",
  templateUrl: "./purchase-report.component.html",
  styleUrls: ["./purchase-report.component.css"]
})
export class PurchaseOrdersReportComponent  {

  url: string ="Reports/GetPurchaseOrdersReport";

}
