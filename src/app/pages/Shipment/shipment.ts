import { Periode } from '../Lookups/Periodes/periode.interface';
import { Forwarder } from '../Lookups/Forwarders/forwarder.interface';
import { PaymentTerm } from '../Lookups/PaymentTerms/paymentTerm.interface';
import { ShipmentFrom } from '../Lookups/ShipmentFrom/shipmentFrom.interface';
import { ShipmentTo } from '../Lookups/ShipmentTo/shipmentTo.interface';
import { Clearance } from '../Lookups/Clearances/clearance.interface';
import { PortofLoading } from '../Lookups/PortofLoadings/portofLoading.interface';
import { FinalDestination } from '../Lookups/FinalDestinations/finalDestination.interface';
import { CommercialInvoice } from '../CommercialInvoice/commercial-invoice';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { ShipmentExpense } from './shipment.expense';

export class Shipment {

  ShipmentId: number;
  ShipmentNo: string;
  ShipmentName:string;
  ShipmentStatus:number=1;
  TotalAmount: number = 0;
  TotalQuantity: number = 0;
  ShipmentDate: string;
  Season: Periode = {};
  Forwarder: Forwarder = new Forwarder();
  ShippingTerm: PaymentTerm = {};
  PaymentTerm: PaymentTerm = {};
  ShipmentFrom: ShipmentFrom = {};
  ShipmentTo: ShipmentTo = {};
  StorageDaysAvg: string;
  StorageFees: string;
  AgreedShippingDate: string;
  AgreedArrivaldDate: string;
  ActualShippingDate: string;
  ActualArrivaldDate: string;
  Clearance: Clearance = {};
  PortofLoading: PortofLoading = {};
  PortOfDischarge: FinalDestination = {};
  AgreedWHDate: string;
  ActualWHDate: string;
  AttachmentId: number = 0;
  Status: Lookup = {};
  ShipmentInvoices: CommercialInvoice[] = [];
  ShipmentExpenses: ShipmentExpense[] = [];
  WarehousingCompany:string;
  Remarks:string;
}
