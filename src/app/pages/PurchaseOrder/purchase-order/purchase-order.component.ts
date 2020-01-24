import { Component, ViewChild, OnInit } from "@angular/core";
import { PurchaseOrder } from "../purchase.order";
import { PurchaseOrderItem } from "../purchase.order.item";
import { PurchaseOrderService } from "../purchase-order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from 'primeng/primeng';
import { ConfirmationService } from "primeng/primeng";
import { WorkflowService } from '../../components/workflow/workflow.service';
import { Task } from '../../components/workflow/task';



@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
  styleUrls: ["./purchase-order.component.css"]
})
export class PurchaseOrderComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  isNewItem: boolean;
  editMode: boolean = false;
  viewMode: boolean = false;
  _display: boolean = false;
  order: PurchaseOrder;
  item: PurchaseOrderItem;
  canSubmitItemForm: boolean;
  canSubmitOrderForm: boolean;
  msgs: Message[] = [];
  isFilter: boolean = false;
  task: Task = new Task();
  taskId: number;
  nextPage: string = "/pages/transactions/purchaseOrder/searchPurchaseOrder";
  selectedItems: PurchaseOrderItem[] = [];

  @ViewChild("itemf") itemf: any;
  @ViewChild("orderf") orderf: any;
  @ViewChild("orderDate") orderDate: any;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private workflowService: WorkflowService
  ) { }
  PreAddOrder() {
    this.resetOrderValues();
    this.purchaseOrderService.getNextPurchaseOrderNo().subscribe(res => {
      this.order.OrderNo = res.Item;
      // let  d: Date = new Date();
      // this.order.OrderDate = (d.getMonth() +1) + "/" + d.getUTCDay() + "/" + d.getFullYear();
      // this.orderDate.value = this.order.OrderDate;
      // console.log('this.order.OrderDate',this.order.OrderDate);
    });
    this.resetItemValues();
    this.canSubmitOrderForm = false;
  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  resetOrderValues() {
    this.order = new PurchaseOrder();
  }

  resetItemValues() {
    this.item = new PurchaseOrderItem();
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

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Do you want to delete these record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        if (this.selectedItems) {
          this.selectedItems.forEach(item => {
            let index = this.order.Items.indexOf(item);
            this.order.Items = this.order.Items.filter((val, i) => i != index);
          });
        }
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The items deleted successfully' });
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
    //debugger;
    let id = this.activatedRoute.snapshot.params["id"];
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    if (id != null) {
      this.editMode = true;
      this.viewMode = false;
      this.resetOrderValues();
      this.resetItemValues();
      this.purchaseOrderService
        .getPurchaseOrderById(id)
        .subscribe(res => {
          if (res.Success) {
            this.order = res.Item;
            this.order.Items.forEach((item) => {
              item.FXAmount = item.FXPrice * item.Quantity;
              item.ColorStr = item.Color.Code + ' - ' + item.Color.Name;
              item.SizeStr = item.Size.Code + ' - ' + item.Size.Name;
            });
          }
        });
    } else if (this.taskId != null) {
      this.viewMode = true;
      this.editMode = false;
      this.resetOrderValues();
      this.resetItemValues();
      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.purchaseOrderService
            .getPurchaseOrderById(this.task.TransactionId)
            .subscribe(res => {
              if (res.Success) {
                this.order = res.Item;
                this.order.Items.forEach((item) => {
                  item.FXAmount = item.FXPrice * item.Quantity;
                  item.ColorStr = item.Color.Code + ' - ' + item.Color.Name;
                  item.SizeStr = item.Size.Code + ' - ' + item.Size.Name;
                });
              }
            });
        }
      })

    } else {
      this.editMode = false;
      this.viewMode = false;
      this.PreAddOrder();
    }
  }

  selectColor(event) {
    this.item.Color = { Code: event.Code, Name: event.Name, Id: event.Id };
    this.item.ColorStr = event.Code + ' - ' + event.Name;
    this.validateItemForm();
  }

  selectCurrency(event) {
    this.item.Currency = {
      CurrencyId: event.CurrencyId,
      CurrencyName: event.CurrencyName
    };
    this.validateItemForm();
  }

  selectPerOrder(event) {
    this.order.PreOrderId = event.OrderId;
    this.order.PreOrderNo = event.OrderNo;
    this.order.Items = event.Items;
    this.order.Items.forEach((item) => {
      item.FXAmount = item.FXPrice * item.Quantity;
      item.ItemId = 0;
      item.SizeStr = item.Size.Code + ' - ' + item.Size.Name;
      item.ColorStr = item.Color.Code + ' - ' + item.Color.Name;
    });
    this.validateOrderForm();
  }

  selectVendor(event) {
    this.item.Vendor = { Code: event.Code, Name: event.Name };
    this.validateItemForm();
  }

  selectStyle(event) {
    this.item.StyleDefinition = event;
    this.validateItemForm();
  }

  selectCOO(event) {
    this.item.COO = { Id: event.Id, Name: event.Name };
    this.validateItemForm();
  }

  selectSize(event) {
    this.item.Size = { Code: event.Code, Name: event.Name, Id: event.Id };
    this.item.SizeStr = event.Code + ' - ' + event.Name;
    this.validateItemForm();
  }

  validateItemForm() {
    if (this.itemf.valid) {
      if (
        this.item.Vendor.Code &&
        this.item.Color.Code &&
        this.item.Currency.CurrencyId &&
        this.item.StyleDefinition.StyleNumber &&
        this.item.COO.Name &&
        this.order.PreOrderId &&
        this.item.Size.Code
      ) {
        this.canSubmitItemForm = true;
      }
    }
  }


  validateOrderForm() {
    if (
      (this.orderf.valid || this.editMode) &&
      this.order.Items.length > 0
      && this.order.OrderDate
    ) {
      this.canSubmitOrderForm = true;
    }
  }

  onShowButton(): void {
    this._display = true;
  }

  onCancel() {
    console.log("PurchaseOrderComponent --- onCancel");
    this._display = false;
  }

  onSubmit() {
    this.purchaseOrderService
      .savePurchaseOrder(this.order)
      .subscribe(res => {
        console.log("savePurchaseOrder", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The order saved successfully' });
          this.router.navigateByUrl(
            this.nextPage
          );
        }
      });
  }

  onSubmitItem() {
    console.log("PurchaseOrderComponent --- onSubmitItem");
    this.addItem();
    this.canSubmitItemForm = false;
    this.validateOrderForm();
    if (!this.isNewItem) {
      // this._display = false;
      let index = this.order.Items.indexOf(this.item);
      if (++index == this.order.Items.length) {
        this._display = false;
      } else {
        let i = this.order.Items[index];
        this.item = i;
      }
      //  this.msgs.push({severity:'success', summary:'Success Message', detail:'The item updated successfully'});
    } else {
      //  this.msgs.push({severity:'success', summary:'Success Message', detail:'The item added successfully'});
      let i = this.item;
      this.item = new PurchaseOrderItem();
      this.item.Color = i.Color;
      this.item.Vendor = i.Vendor;
      this.item.ColorStr = i.ColorStr;
      this.item.COO = i.COO;
      this.item.Currency = i.Currency;
      this.item.FXPrice = i.FXPrice;
      this.item.StyleDefinition = i.StyleDefinition;
      this.item.OrderId = i.OrderId;
      this.item.Size = {};
      this.item.SizeStr = '';
      this.item.PreOrderItemId = i.PreOrderItemId;

    }

  }

  calculateAmount() {
    if (this.item.Quantity > 0 && this.item.FXPrice > 0) {
      this.item.FXAmount = this.item.Quantity * this.item.FXPrice;
      this.validateItemForm();
    }
  }

  addItemsFromCsvFile(data) {
    if (data != null) {
      let items = [...this.order.Items];
      let styles = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Styles"));
      let colors = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Colors"));
      let COOList = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("COO"));
      let vendors = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Vendors"));
      let sizeList = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Size"));
      let currencies = JSON.parse(this.purchaseOrderService.loadObjectFromLocalStorage("Currencies"));
      let itemList = data.slice(1);
      itemList.forEach(i => {
        let ppoi = new PurchaseOrderItem();
        styles.forEach(s => {
          if (s.StyleNumber == i[0]) {
            ppoi.StyleDefinition = s;
            return
          }
        });
        vendors.forEach(v => {
          if (v.Code == i[1]) {
            ppoi.Vendor = v;
            return
          }
        });
        COOList.forEach(c => {
          if (c.Name == i[2]) {
            ppoi.COO = c;
            return
          }
        });
        colors.forEach(c => {
          if (c.Code == i[3]) {
            ppoi.Color = c;
            ppoi.ColorStr = c.code + " - " + c.Name;
            return
          }
        });
        sizeList.forEach(s => {
          if (s.Code == i[4]) {
            ppoi.Size = s;
            ppoi.SizeStr = s.code + " - " + s.Name;
            return
          }
        });
        ppoi.Quantity = +i[5];
        ppoi.FXPrice = +i[6];
        ppoi.Barcode = i[8];
        this.order.PreOrderNo = i[9];
        ppoi.FXAmount = ppoi.Quantity * ppoi.FXPrice;
        currencies.forEach(c => {
          if (c.CurrencyId == i[7]) {
            ppoi.Currency = c;
            return
          }
        });
        items.push(ppoi);
      });
      this.order.Items = items;
      this.validateOrderForm();
    }
  }
}
