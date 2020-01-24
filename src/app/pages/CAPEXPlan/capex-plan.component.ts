import { Component, EventEmitter, Input, Output, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/primeng';
import { CAPEXPlanService } from './capex-plan.service';
import { CAPEXPlanCriteria } from './capex-plan.criteria';


@Component({
  selector: "NgCAPEXPlan",
  templateUrl: "./capex-plan.component.html",
  styleUrls: ["./capex-plan.component.css"]
})
export class CAPEXPlanComponent implements OnInit {

  planItems: any[] = [];
  plan: any;
  criteria: CAPEXPlanCriteria = new CAPEXPlanCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  branch: string;
  months: string[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];

  constructor(private service: CAPEXPlanService) {
    this.monthListMap.set(1, 'Jan');
    this.monthListMap.set(2, 'Feb');
    this.monthListMap.set(3, 'Mar');
    this.monthListMap.set(4, 'Apr');
    this.monthListMap.set(5, 'May');
    this.monthListMap.set(6, 'Jun');
    this.monthListMap.set(7, 'Jul');
    this.monthListMap.set(8, 'Aug');
    this.monthListMap.set(9, 'Sep');
    this.monthListMap.set(10, 'Oct');
    this.monthListMap.set(11, 'Nov');
    this.monthListMap.set(12, 'Dec');
  }





  getCAPEXPlan() {

    this.service.getCAPEXPlan(this.criteria).subscribe(res => {
      console.log('getCAPEXPlan - res', res);
      if (res.Success) {
        //   debugger;
        this.enableGet = false;
        this.enableSave = false;
        this.plan = res.Item;
        this.planItems = res.Item.Items;
        this.viewResult = true;
        this.criteria.PlanId = this.plan.PlanId;
        res.Item.Items[0].ItemMonths.forEach(m => {
          this.months.push(this.monthListMap.get(m.PlanMonth));
        });

      }
    });


  }


  onSubmit() {
  //  this.plan.Deparment = this.criteria.Deparment;
    this.service
      .SaveCAPEXPlan(this.plan)
      .subscribe(res => {
        console.log("SaveCAPEXPlan", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }


  ngOnInit() {
  }

  calculateTotalBudget(index) {
    let item = this.planItems[index];
    item.TotalBudget = 0.0;
    item.ItemMonths.forEach(m => {
      item.TotalBudget = +item.TotalBudget + +m.TotalAmount;
    });
    this.enableSave = true;
  }

  selectBranch(event) {
    this.criteria.BranchId = event.Id;
    this.branch = event.Name;
    this.validateForm();
  }

  selectDeparment(event) {
    //  debugger;
    //  console.log('selectDeparment', event);
   // this.criteria.Deparment = event;
    this.validateForm();
  }

  validateForm() {
    if (this.criteria.BranchId &&
    //  this.criteria.Deparment.Id &&
      this.criteria.PlanYear) {
      this.enableGet = true;
    } else {
      this.enableGet = false;
    }
  }

}
