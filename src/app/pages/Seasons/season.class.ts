import { Lookup } from "../Lookups/Lookup/lookup.interface";


export class Season {

  SeasonID: number;
  Name: string;
  FromDate: string;
  ToDate: string;
  SeasonType: Lookup = {};

}
