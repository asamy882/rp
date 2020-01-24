import { Country } from '../Countries/country.interface';

export interface Clearance {
	Code?: string;
	Name?: string;
	Description?: string;
	AccountNo?: string;
	ContactPerson?: string;
	Country?: Country;
}

