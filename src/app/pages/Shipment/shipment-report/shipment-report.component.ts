import { Component } from "@angular/core";


@Component({
  selector: "shipment-report",
  templateUrl: "./shipment-report.component.html",
  styleUrls: ["./shipment-report.component.css"]
})
export class ShipmentsReportComponent  {

  url: string ="Reports/GetShipmentsReport";

}
