import { Lookup } from '../Lookup/lookup.interface';
import { Country } from '../Countries/country.interface';
import { Vendor } from '../Vendors/vendor.interface';

export interface Shipper extends Lookup {
	Description?: string;
	Country?: Country;
	Vendor?: Vendor;
}

