import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SalesPlanService } from './sales-plan.service';
import { SalesPlanCriteria } from './sales-plan.criteria';


@Component({
  selector: "NgSalesPlan",
  templateUrl: "./sales-plan.component.html",
  styleUrls: ["./sales-plan.component.css"]
})
export class SalesPlanComponent  implements OnInit  {

 planItems: any [] = [];
 plan: any;
 criteria: SalesPlanCriteria = new SalesPlanCriteria();
 viewResult: boolean = false;
 enableGet: boolean = false;
 enableSave: boolean = false;
 branch: string;
 season: string;
 months: string [] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
 cols: number;
 tableWidth: number;
 monthListMap : Map<number, string> = new Map<number, string>();
 msgs: Message[] = [];

  constructor(private service: SalesPlanService) {
    this.monthListMap.set(1 , 'Jan');
    this.monthListMap.set(2 , 'Feb');
    this.monthListMap.set(3 , 'Mar');
    this.monthListMap.set(4 , 'Apr');
    this.monthListMap.set(5 , 'May');
    this.monthListMap.set(6 , 'Jun');
    this.monthListMap.set(7 , 'Jul');
    this.monthListMap.set(8 , 'Aug');
    this.monthListMap.set(9 , 'Sep');
    this.monthListMap.set(10 , 'Oct');
    this.monthListMap.set(11 , 'Nov');
    this.monthListMap.set(12 , 'Dec');
  }





  getSalesPlan() {

    this.service.getSalesPlan(this.criteria).subscribe(res =>{
      console.log('getSalesPlan - res',res);
      if(res.Success){
     //   debugger;
        this.enableGet = false;
        this.enableSave = true;
        this.plan = res.Item;
        this.planItems = res.Item.Items;
        this.viewResult = true;
        this.criteria.SPlanID = this.plan.SPlanID;
        res.Item.Items[0].ItemMonths.forEach(m => {
          this.months.push(this.monthListMap.get(m.PlanMonth));
        });
        this.cols = 5 + this.months.length;
        this.tableWidth = 650 + this.months.length * 4 * 150;

      /*  if(!res.Item.SPlanID){
          res.Item.Items.forEach(item => {
            item.ItemMonths.forEach(m => {
              m.Dicount = 0.0;
              m.Price = item.OrginalPrice;
            //  m.Amount = m.Qty * m.Price;
            })
          });
        }*/
       }
    });


  }


  onSubmit() {
    this.service
      .SaveSalesPlan(this.plan)
      .subscribe(res => {
        console.log("SaveSalesPlan", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });
        }
      });
  }


  ngOnInit() {
  }

  selectBranch(event) {
    this.criteria.BranchId = event.Id;
    this.branch = event.Name;
    this.validateForm();
  }

  selectSeason(event) {
  //  debugger;
  //  console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    this.validateForm();
  }

  validateForm(){
    if(this.criteria.BranchId &&
    this.criteria.SeasonID  ){
      this.enableGet= true;
    } else{
      this.enableGet = false;
    }
  }

  onChange(index){
   // console.log('index', index);
   // debugger;
    debugger;
    let item = this.planItems[index];
    item.TotalQty = 0;
    item.TotalSales = 0;
    item.ItemMonths.forEach(m => {
      item.TotalQty = +item.TotalQty + +m.Qty;
      m.Amount = m.Dicount > 0 ? (item.OrginalPrice * (100 - m.Dicount) / 100 * m.Qty) : item.OrginalPrice * m.Qty;
      item.TotalSales = +item.TotalSales + +m.Amount;
    });
    let totalPrice = ( +item.TotalQty * +item.OrginalPrice);
    item.TotalDiscount = ( +totalPrice - +item.TotalSales ) / totalPrice * 100;
    item.AVGPrice = +item.TotalSales / +item.TotalQty;
  }

}
