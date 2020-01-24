import { Component, ViewChild, OnInit } from "@angular/core";
import { PrePurchaseOrder } from "../pre.purchase.order.interface";
import { PrePurchaseOrderItem } from "../pre.purchase.order.item.interface";
import { PrePurchaseOrderService } from "../pre-purchase-order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, ConfirmationService } from 'primeng/primeng';
import { Style } from '../../Lookups/Styles/style.interface';



@Component({
  selector: "app-pre-purchase-order",
  templateUrl: "./pre-purchase-order.component.html",
  styleUrls: ["./pre-purchase-order.component.css"]
})
export class PrePurchaseOrderComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  isNewItem: boolean;
  editMode: boolean;
  _display: boolean = false;
  order: PrePurchaseOrder;
  item: PrePurchaseOrderItem;
  canSubmitItemForm: boolean;
  canSubmitOrderForm: boolean;
  isFilter: boolean = false;
  msgs: Message[] = [];
  uploadUrl: string = "D:/UploadFiles"
  uploadedFiles: any[] = [];;

  @ViewChild("itemf") itemf: any;
  @ViewChild("orderf") orderf: any;

  constructor(
    private prePurchaseOrderService: PrePurchaseOrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }
  PreAddOrder() {
    this.resetOrderValues();
    this.prePurchaseOrderService.getNextPrePurchaseOrderNo().subscribe(res => {
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
    this.item = new PrePurchaseOrderItem();
   /* this.item.Color = {};
    this.item.Vendor = {};
    this.item.Size = {};
    this.item.Currency = {};
    this.item.COO = {};
    this.item.StyleDefinition = {};*/
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
      this.prePurchaseOrderService
        .getPrePurchaseOrderById(id)
        .subscribe(res => {
          if (res.Success) {
            this.order = res.Item;
            this.order.Items.forEach((item) => {
              item.ColorStr = item.Color.Code + " - " + item.Color.Name;
              item.SizeStr = item.Size.Code + " - " + item.Size.Name;
              item.FXAmount = item.FXPrice * item.Quantity;
              if (item.StyleDefinition == null)
                item.StyleDefinition = new Style();
            });
          }
        });
    } else {
      this.editMode = false;
      this.PreAddOrder();
    }
  }

  selectColor(event) {
    this.item.Color = { Code: event.Code, Name: event.Name, Id: event.Id };
    this.item.ColorStr = this.item.Color.Code + " - " + this.item.Color.Name;
    this.validateItemForm();
  }

  selectItemGroup1(event) {
  //  this.item.ItemGroup1 = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }

  selectItemGroup3(event) {
   // this.item.ItemGroup3 = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }

  selectCOO(event) {
    this.item.COO = { Id: event.Id, Name: event.Name };
     this.validateItemForm();
   }

   selectStyle(event) {
     this.item.StyleDefinition = event;
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


  selectVendor(event) {
    this.item.Vendor = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }

  selectSize(event) {
    this.item.Size = { Code: event.Code, Name: event.Name, Id: event.Id };
    this.item.SizeStr = this.item.Size.Code + " - " + this.item.Size.Name;
    this.validateItemForm();
  }

  validateItemForm() {
    debugger;
    if (this.itemf.valid) {
      if (
        this.item.Vendor.Code &&
        this.item.Color.Code &&
        this.item.Currency.CurrencyId &&
        this.item.COO.Name &&
        this.item.StyleDefinition.StyleNumber &&
        this.item.Size.Code
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
    this.prePurchaseOrderService
      .savePrePurchaseOrder(this.order)
      .subscribe(res => {
        console.log("savePrePurchaseOrder", res);
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The order saved successfully' });
          this.router.navigateByUrl(
            "/pages/transactions/prePurchaseOrder/searchPrePurchaseOrder"
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
    this.item = {};
    this.item.Color = i.Color;
    this.item.Vendor = i.Vendor;
    this.item.ColorStr = i.ColorStr;
    this.item.COO = i.COO;
    this.item.Currency = i.Currency;
    this.item.FXPrice = i.FXPrice;
    this.item.COO = i.COO;
    this.item.StyleDefinition = i.StyleDefinition;
    this.item.OrderId = i.OrderId;
    this.item.Size = {};
    this.item.SizeStr = '';
    this.canSubmitItemForm = false;
    this.validateOrderForm();
  }

  calculateAmount() {
    if (this.item.Quantity > 0 && this.item.FXPrice > 0){
      this.item.FXAmount = this.item.Quantity * this.item.FXPrice;
      this.validateItemForm();
    }
  }



addItemsFromCsvFile(data){
  if(data != null){
    let items = [...this.order.Items];
    let styles = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("Styles"));
    let colors = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("Colors"));
    let COOList = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("COO"));
    let vendors = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("Vendors"));
    let sizeList = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("Size"));
    let currencies = JSON.parse(this.prePurchaseOrderService.loadObjectFromLocalStorage("Currencies"));
    let itemList = data.slice(1);
    itemList.forEach(i => {
      let ppoi = new PrePurchaseOrderItem();
      styles.forEach(s => {
        if(s.StyleNumber == i[0]){
        ppoi.StyleDefinition = s;
        return
      }});
      vendors.forEach(v => {if(v.Code == i[1]){
        ppoi.Vendor = v;
        return
      }});
      COOList.forEach(c => {if(c.Name == i[2]){
        ppoi.COO = c;
        return
      }});
      colors.forEach(c => {if(c.Code == i[3]){
        ppoi.Color = c;
        ppoi.ColorStr = c.code + " - " + c.Name;
        return
      }});
      sizeList.forEach(s => {if(s.Code == i[4]){
        ppoi.Size = s;
        ppoi.SizeStr = s.code + " - " + s.Name;
        return
      }});
      ppoi.Quantity = +i[5];
      ppoi.FXPrice = +i[6];
      ppoi.FXAmount = ppoi.Quantity * ppoi.FXPrice;
      currencies.forEach(c => {if(c.CurrencyId == i[7]){
        ppoi.Currency = c;
        return
      }});
    //  console.log(i,ppoi);
      items.push(ppoi);
    });
    this.order.Items = items;
    this.validateOrderForm();
  }
}

}
