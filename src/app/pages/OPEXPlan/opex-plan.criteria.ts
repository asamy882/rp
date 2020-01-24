import { Lookup } from '../Lookups/Lookup/lookup.interface';

export class OPEXPlanCriteria {
  PlanId: number;
  CostCenterId: number;
  PlanYear: number;
  Deparment: Lookup = {};
}
