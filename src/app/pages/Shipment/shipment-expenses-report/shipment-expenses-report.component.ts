import { Component } from "@angular/core";


@Component({
  selector: "shipment-expenses-report",
  templateUrl: "./shipment-expenses-report.component.html",
  styleUrls: ["./shipment-expenses-report.component.css"]
})
export class ShipmentExpensesReportComponent  {

  url: string ="Reports/GetShipmentExpensesReport";

}
