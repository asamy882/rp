import { Lookup } from '../Lookup/lookup.interface';


export class Style {
  StyleNumber?: string;
	ItemName?: string;
	ItemCode?: string;
  ItemGroup1?: Lookup = {};
  ItemGroup2?: Lookup = {};
  ItemGroup3?: Lookup = {};
  ItemGroup4?: Lookup = {};
  ItemGroup5?: Lookup = {};
}

