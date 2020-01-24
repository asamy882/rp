import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
//import { PricingService } from "../pricing.service";
import { Pricing } from "../pricing.interface";
import { from } from "rxjs/observable/from";
import { PricingService } from "app/pages/Pricing/pricing.service";

@Component({
  selector: "app-search-Pricing",
  templateUrl: "./search-pricing.component.html",
  styleUrls: ["./search-pricing.component.css"]
})
export class SearchPricingComponent implements OnInit {
  pricing: Pricing[];
  selectedPricing: Pricing;
  isFilter: boolean = false;
  isItemsFilter: boolean = false;


  constructor(
    private router: Router,
    private pricingService: PricingService
  ) { }

  addNewPricing() {
    this.router.navigateByUrl("/pages/transactions/pricing/pricing");
  }

  editPricing(item) {

    this.router.navigateByUrl(
      "/pages/transactions/pricing/pricing/edit/" + item.PricingId
    );
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  ngOnInit() {
    this.pricingService.getAllPricing().subscribe(res => {
      if (res.Success) {
        this.pricing = res.Items;
        this.pricing.forEach(pricingElemen => {
          pricingElemen.Items.forEach(element => {

            element.Total = parseFloat((element.FXPrice * element.Quantity).toFixed(2));
            element.TotalCost = parseFloat((element.UnitCost * element.Quantity).toFixed(2));
            // element.UnitPrice = element.TotalCost * element.Markup;
            element.Markup =  parseFloat((element.UnitPrice ? (element.UnitPrice / element.UnitCost) : pricingElemen.Markup).toFixed(2));
          });
        });
      }
    });
  }

  deletePricing(item) {
    debugger;
    if (confirm("Are you sure to delete this Pricing")) {
      this.pricingService
        .deletePricing(item.PricingId)
        .subscribe(res => {

          if (res.Success) {
            let index = this.pricing.indexOf(item);
            this.pricing = this.pricing.filter(
              (val, i) => i != index
            );
            // this.msgs.push({severity:'success', summary:'Success Message', detail:'The order deleted successfully'});
          } else {
            //  this.msgs.push({severity:'error', summary:'Error Message', detail:'Faild to delete the order'});
          }
        });
    }
  }
}
