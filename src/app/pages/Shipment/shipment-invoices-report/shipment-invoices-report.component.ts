import { Component } from "@angular/core";


@Component({
  selector: "shipment-invoices-report",
  templateUrl: "./shipment-invoices-report.component.html",
  styleUrls: ["./shipment-invoices-report.component.css"]
})
export class ShipmentInvoicesReportComponent  {

  url: string ="Reports/GetShipmentInvoicesReport";

}
