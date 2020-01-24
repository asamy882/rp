import { Costing } from "app/pages/Pricing/costing.interface";


import { PricingItem } from './pricing.item.interface';


export interface Pricing {

  PricingId?: number;
  PricingDate?: string;
  Markup?:number;
  StatusId?: number;
  Costing?:Costing;
  Items?:PricingItem[];
  


}
