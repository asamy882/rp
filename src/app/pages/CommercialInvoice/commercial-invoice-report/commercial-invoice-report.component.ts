import { Component } from "@angular/core";


@Component({
  selector: "app-commercial-invoice-report",
  templateUrl: "./commercial-invoice-report.component.html",
  styleUrls: ["./commercial-invoice-report.component.css"]
})
export class CommercialInvoiceReportComponent  {

  url: string ="Reports/GetInvoiceItemsReport";

}
