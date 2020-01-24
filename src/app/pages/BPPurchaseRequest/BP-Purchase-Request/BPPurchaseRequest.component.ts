import { Component, ViewChild, OnInit } from "@angular/core";
import { BPPurchaseRequest } from "../BPPurchaseRequest.interface";
import { BPPurchaseRequestItem } from "../BPPurchaseRequestItem.interface";
import { BPPurchaseRequestService } from "../BPPurchaseRequest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, ConfirmationService } from 'primeng/primeng';



@Component({
  selector: "app-BP-Purchase-Request",
  templateUrl: "./BPPurchaseRequest.component.html",
  styleUrls: ["./BPPurchaseRequest.component.css"]
})
export class BPPurchaseRequestComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  isNewItem: boolean;
  editMode: boolean;
  _display: boolean = false;
  order: BPPurchaseRequest;
  item: BPPurchaseRequestItem;
  canSubmitItemForm: boolean;
  canSubmitOrderForm: boolean;
  isFilter: boolean = false;
  msgs: Message[] = [];
  uploadUrl: string = "D:/UploadFiles"
  uploadedFiles: any[] = [];;

  @ViewChild("itemf") itemf: any;
  @ViewChild("orderf") orderf: any;

  constructor(
    private bpPurchaseRequestService: BPPurchaseRequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }
  PreAddOrder() {
    this.resetOrderValues();
    this.bpPurchaseRequestService.getNextPrePurchaseOrderNo().subscribe(res => {
      this.order.OrderNo = res.Item;
      //  let  d: Date = new Date();
      //  this.order.OrderDate = "0"+(d.getMonth() +1) + "/0" + d.getUTCDay() + "/" + d.getFullYear();
      //  console.log('this.order.OrderDate',this.order.OrderDate);
    });
    this.resetItemValues();
    this.canSubmitOrderForm = false;
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  resetOrderValues() {
    this.order = {};
    this.order.Season = {};
    this.order.Items = [];
  }

  resetItemValues() {
    this.item = new BPPurchaseRequestItem();
  }

  preAddItem() {
    this.resetItemValues();
    this.isNewItem = true;
    this.itemf.reset();
    this._display = true;
    this.canSubmitItemForm = false;
  }

  preUpdateItem(item) {
    this.item = item;
    this.isNewItem = false;
    this._display = true;
  }

  deleteItem(item) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.order.Items.indexOf(item);
        this.order.Items = this.order.Items.filter((val, i) => i != index);
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The item deleted successfully' });
      }
    });
  }

  addItem() {
    let items = [...this.order.Items];
    if (this.isNewItem) {
      items.push(this.item);
    }
    this.order.Items = items;
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    console.log("Id", id);
    if (id != null) {
      this.editMode = true;
      this.resetOrderValues();
      this.resetItemValues();
      this.bpPurchaseRequestService
        .getPrePurchaseOrderById(id)
        .subscribe(res => {
          if (res.Success) {
            this.order = res.Item;           
          }
        });
    } else {
      this.editMode = false;
      this.PreAddOrder();
    }
  }

  
  selectItemGroup1(event) {
   this.item.ItemGroup1 = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }
  
  selectItemGroup2(event) {
    this.item.ItemGroup2 = { Code: event.Code, Name: event.Name };
     this.validateItemForm();
   }

  selectItemGroup3(event) {
    this.item.ItemGroup3 = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }

  selectPriority(event) {
    this.item.Priority = { Code: event, Name: event.Name };
    this.validateItemForm();
  }

  selectCurrency(event) {
    this.item.Currency = {
      CurrencyId: event.CurrencyId,
      CurrencyName: event.CurrencyName
    };
    this.validateItemForm();
  }

  selectSeason(event) {
    this.order.Season = { SeasonID: event.SeasonID, Name: event.Name };
    this.validateOrderForm();
  }

  validateItemForm() {

    if (this.itemf.valid) {
      if (
        this.item.ItemName &&
        this.item.ItemGroup1.Code &&
        this.item.ItemGroup2.Code &&
        this.item.ItemGroup3.Code &&
        this.item.Currency.CurrencyId &&
        this.item.Quantity && 
        this.item.AvgCostPrice
      ) {
        this.canSubmitItemForm = true;
      }
    }else{
      this.canSubmitItemForm = false;
    }
  }

  validateOrderForm() {
    console.log('validateOrderForm');
    if (
      this.orderf.valid &&
      this.order.Items.length > 0 &&
      this.order.OrderDate &&
      this.order.Season.SeasonID
    ) {
      this.canSubmitOrderForm = true;
    }
  }

  onShowButton(): void {
    this._display = true;
  }

  onCancel() {
    console.log("PrePurchaseOrderComponent --- onCancel");
    this._display = false;
  }

  onSubmit() {
    debugger;
    this.bpPurchaseRequestService
      .savePrePurchaseOrder(this.order)
      .subscribe(res => {
        console.log("savePrePurchaseOrder", res);
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The order saved successfully' });
          this.router.navigateByUrl(
            "/pages/business plan/bpPurchaseRequest/searchBPPurchaseRequest"
          );
        }
      });
  }

  onSubmitItem() {
    console.log("PrePurchaseOrderComponent --- onSubmitItem");
    this.addItem();
    if (!this.isNewItem) {
      this._display = false;
      //  this.msgs.push({severity:'success', summary:'Success Message', detail:'The item updated successfully'});
    } else {
      //  this.msgs.push({severity:'success', summary:'Success Message', detail:'The item added successfully'});
    }
    let i = this.item;
    this.item = new BPPurchaseRequestItem();
    this.item.ItemName = i.ItemName;
    this.item.ItemGroup1 = i.ItemGroup1;
    this.item.ItemGroup2 = i.ItemGroup2;
    this.item.ItemGroup3 = i.ItemGroup3;
    this.item.Currency = i.Currency;
    this.item.Priority = i.Priority;
    this.canSubmitItemForm = false;
    this.validateOrderForm();
  }


}
