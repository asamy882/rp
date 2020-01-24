import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApplicationService } from "../AppCommon/application.service";
import { Shipment } from "./shipment";

@Injectable()
export class ShipmentService extends ApplicationService {
  saveShipment(shipment: Shipment): Observable<any> {
    console.log("saveShipment", shipment);
    return super.observablePost("Shipment/Save", shipment);
  }

  getShipments(): Observable<any> {
    return super.observableGet("Shipment/GetAll");
  }

  getShipmentById(id: number): Observable<any> {
    return super.observableGet("Shipment/Get?shipmentId=" + id);
  }

  deleteShipment(id: number): Observable<any> {
    return super.observableDelete("Shipment/Delete?shipmentId=" + id);
  }

  getNextShipmentNo(): Observable<any> {
    return super.observableGet("Shipment/GetNextShipmentNo");
  }
}
