import { Lookup } from '../Lookup/lookup.interface';
import { Country } from '../Countries/country.interface';
import { Supplier } from '../Suppliers/supplier.interface';
import {PaymentTerm} from '../PaymentTerms/paymentTerm.interface';

export interface Vendor extends Lookup {
	Description?: string;
	AccountNo?: string;
	Supplier?: Supplier;
  Country?: Country;
  PaymentTerm?: PaymentTerm;
  BankName?: string;
  BankAddress?: string;
  SwiftCode?: string;
  ResponsiblePerson?: string;
}

