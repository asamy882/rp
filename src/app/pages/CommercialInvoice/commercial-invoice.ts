import { Vendor } from '../Lookups/Vendors/vendor.interface';
import { Lookup } from '../Lookups/Lookup/lookup.interface';
import { Country } from '../Lookups/Countries/country.interface';
import { PaymentTerm } from '../Lookups/PaymentTerms/paymentTerm.interface';
import { PortofLoading } from '../Lookups/PortofLoadings/portofLoading.interface';
import { FinalDestination } from '../Lookups/FinalDestinations/finalDestination.interface';
import { CommercialInvoiceItem } from './commercial-invoice.item';
import { Priority } from '../Lookups/Priorities/priority.interface';
import { Shipper } from '../Lookups/Shippers/shipper.interface';


export class CommercialInvoice {

  InvoiceId: number;
  InvoiceNo: string="";
  ShipmentNo: string="";
  InvoiceDate?: string;
  ArrivalDate?: string;
  DateofFinanace?: string;
  DateOfPayment?: string;
  BankName?: string;
  OriginCountry: Country = {};
  PaymentTerm: PaymentTerm = {};
  PortofLoading: PortofLoading = {};
  FinalDestination: FinalDestination = {};
  Priority: Priority = {};
  PaymentStatus: Lookup = {};
  Status: Lookup = {};
  Shipper: Shipper = {};
  Vendor: Vendor = { PaymentTerm : {}, Country : {}};
  VendorStr: string="";
  AttachmentId: number = 0;
  Items: CommercialInvoiceItem[]=[];
  TotalQuantity: number = 0;
  TotalAmount: number = 0;
  NumberOfCartons: number;
  CBM: number;
  GW: number;
  NW: number;
}
