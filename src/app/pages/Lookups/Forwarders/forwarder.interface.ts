import {Lookup} from "../Lookup/lookup.interface";
import {Country} from "../Countries/country.interface";

export class Forwarder {

  Code:string;
  Name:string;
  Description:string;
  AccountNo:string;
  ContactPerson:string;
  Country?: Country;
}

