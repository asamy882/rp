import { Component, OnInit } from '@angular/core';
import { Pricing } from '../pricing.interface';
import { PricingService } from 'app/pages/Pricing/pricing.service';
//import { PricingService } from '../pricing.service';
import { ActivatedRoute, Router } from "@angular/router";
import { WorkflowService } from '../../components/workflow/workflow.service';
import { Task } from '../../components/workflow/task';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent implements OnInit {

  _modal: boolean = true;
  _width: number = 700;
  isNewItem: boolean;
  editMode: boolean;
  _display: boolean = false;
  isFilter: boolean = false;
  pricing: Pricing;
  Items: any;
  viewMode: boolean = false;
  task: Task = new Task();
  taskId: number;
  nextPage: string = "/pages/transactions/pricing/searchPricing";


  constructor(private pricingService: PricingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private workflowService: WorkflowService) { }
  PreAddPricing() {
    this.pricing = {};
    this.pricing.Costing = {};

    this.resetItemValue();


  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  resetItemValue() {
    // this.item = {};
    //  this.item.Color = {};
    // this.item.Vendor = {};
    // this.item.Size = {};
    // this.item.Currency = {};
    // this.item.ItemGroup1 = {};
    // this.item.ItemGroup3 = {};
  }




  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    this.PreAddPricing();
    this.editMode = false;
    this.viewMode = false;
    if (id != null) {
      this.editMode = true;
      this.viewMode = false;
      this.pricingService
        .getPricingById(id).subscribe(res => {
          if (res.Success) {
            this.pricing = res.Item;
            this.reCallpricing(this.pricing.Markup,false);
          }
        });
    } 
    else if (this.taskId != null) 
    {
      this.viewMode = true;
      this.editMode = false;
      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.pricingService
            .getPricingById(this.task.TransactionId).subscribe(res => {
              if (res.Success) {
                this.pricing = res.Item;
                this.reCallpricing(this.pricing.Markup,false);
              }
            });
        }
      });

    }
  }

  calcPricing(event) {
    this.reCallpricing(event,true);
  }
  selectCosting(event) {

    this.pricing.Costing = { CostingId: event.CostingId, CostingName: event.CostingName };
    this.pricingService.getCosting(event.CostingId).subscribe((res) => {
      this.pricing.Items = res.Item.Items;
      this.reCallpricing(this.pricing.Markup,true);
    });
  }
  test(event) {
    debugger;    
    this.pricing.Items.forEach(element => {
      element.Markup = parseFloat((element.UnitPrice / element.UnitCost).toFixed(2));

    });
  }
  
  reCallpricing(markup: number,calPrice:boolean) {

    this.pricing.Items.forEach(element => {
      element.Markup = parseFloat((!calPrice && element.UnitPrice ? (element.UnitPrice / element.UnitCost) : markup).toFixed(2));
      element.Total = element.FXPrice * element.Quantity;
      element.TotalCost = element.UnitCost * element.Quantity;
     if(calPrice) element.UnitPrice = element.UnitCost * element.Markup;
      element.Total = parseFloat(element.Total.toFixed(2));
      element.TotalCost = parseFloat(element.TotalCost.toFixed(2));
      element.UnitPrice = parseFloat(element.UnitPrice.toFixed(2));
    });
  }




  onShowButton(): void {
    this._display = true;
  }



  onSubmit() {
    // debugger;
    this.pricingService.savePricing(this.pricing).subscribe((res) => {
      //   console.log('res', res);
      if (res.Success) {
        // this.msgs.push({severity:'success', summary:'Success Message', detail:'The order saved successfully'});
        this.router.navigateByUrl(
          this.nextPage
        );
      }
    });
  }



}
