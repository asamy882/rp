import { Lookup } from '../Lookup/lookup.interface';
import { Country } from '../Countries/country.interface';


export interface Supplier extends Lookup {
	AccountNo?: string;
	Description?: string;
	Country?: Country;
}

