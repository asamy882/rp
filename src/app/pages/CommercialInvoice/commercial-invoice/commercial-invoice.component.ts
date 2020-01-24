import { Component, ViewChild, OnInit } from "@angular/core";
import { CommercialInvoice } from "../commercial-invoice";
import { CommercialInvoiceItem } from "../commercial-invoice.item";
import { CommercialInvoiceService } from "../commercial-invoice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PurchaseOrderItem } from '../../PurchaseOrder/purchase.order.item';
import { Message, ConfirmationService } from 'primeng/primeng';
import { CommercialInvoiceItemOrder } from '../commercial-invoice.item.order';
import { WorkflowService } from '../../components/workflow/workflow.service';
import { Task } from '../../components/workflow/task';
import 'rxjs/Rx';



@Component({
  selector: "app-commercial-invoice",
  templateUrl: "./commercial-invoice.component.html",
  styleUrls: ["./commercial-invoice.component.css"]
})
export class CommercialInvoiceComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  isNewItem: boolean;
  editMode: boolean;
  _display: boolean = false;
  invoice: CommercialInvoice;
  item: CommercialInvoiceItem;
  canSubmitItemForm: boolean;
  canSubmitInvoiceForm: boolean;
  canDownloadAttachment: boolean = false;
  msgs: Message[] = [];
  viewMode: boolean = false;
  task: Task = new Task();
  taskId: number;
  nextPage: string = "/pages/transactions/commercialInvoice/searchCommercialInvoice";

  @ViewChild("itemf") itemf: any;
  @ViewChild("invoicef") invoicef: any;

  isFilter: boolean = false;

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  constructor(
    private commercialOrderService: CommercialInvoiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private workflowService: WorkflowService
  ) { }

  PreAddOrder() {
    this.resetInvoiceValues();
    this.commercialOrderService.getNextCommercialInvoiceNo().subscribe(res => {
      this.invoice.InvoiceNo = res.Item;
    });
    this.resetItemValues();
    this.canSubmitInvoiceForm = false;
  }

  resetInvoiceValues() {
    this.invoice = new CommercialInvoice();
  }

  resetItemValues() {
    this.item = new CommercialInvoiceItem();
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
    this.validateOrderForm();
  }

  deleteItem(item) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.invoice.Items.indexOf(item);
        this.invoice.Items = this.invoice.Items.filter((val, i) => i != index);
        this.validateOrderForm();
      }
    });
  }

  addItem() {
    let items = [...this.invoice.Items];
    if (this.isNewItem) {
      items.push(this.item);
    }
    this.invoice.Items = items; 
    this.validateOrderForm();
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    //console.log("Id", id);
    debugger;
    if (id != null) {
      this.editMode = true;
      this.viewMode = false;
      this.resetInvoiceValues();
      this.resetItemValues();
      this.commercialOrderService
        .getCommercialInvoiceById(id)
        .subscribe(res => {
          console.log('res', res);
          if (res.Success) {
            this.invoice = res.Item;
            this.invoice.Items = res.Item.Items;
            this.invoice.Items.forEach( i => {
              i.FXAmount = i.FXPrice * i.Quantity;
            });
            this.invoice.VendorStr = this.invoice.Vendor.Code + ' - ' + this.invoice.Vendor.Name;
            if(this.invoice.AttachmentId &&
              this.invoice.AttachmentId > 0)
              this.canDownloadAttachment = true;
          }
        });
    } else if (this.taskId != null) {
      this.viewMode = true;
      this.editMode = false;
      this.resetInvoiceValues();
      this.resetItemValues();
      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.commercialOrderService
            .getCommercialInvoiceById(this.task.TransactionId)
            .subscribe(res => {
              //  console.log('res', res);
              if (res.Success) {
                this.invoice = res.Item;
                this.invoice.Items = res.Item.Items;
                this.invoice.Items.forEach( i => {
                  i.FXAmount = i.FXPrice * i.Quantity;
                });
                this.invoice.VendorStr = this.invoice.Vendor.Code + ' - ' + this.invoice.Vendor.Name;
                if(this.invoice.AttachmentId &&
                  this.invoice.AttachmentId > 0)
                  this.canDownloadAttachment = true;
              }
            });
        }
      });

    } else {
      this.editMode = false;
      this.viewMode = false;
      this.PreAddOrder();
    }
  }

  selectShipper(event) {
    this.invoice.Shipper = event;
    this.invoice.Shipper.Name = event.Name;
    this.validateOrderForm();
  }

  selectPriority(event) {
    this.invoice.Priority = event;
    this.invoice.Priority.Name = event.Name;
    this.validateOrderForm();
  }

  selectOriginCountry(event) {
    this.invoice.OriginCountry = event;
    this.invoice.OriginCountry.Name = event.Name;
    this.validateOrderForm();
  }

  selectPortofLoading(event) {
    this.invoice.PortofLoading = event;
    this.invoice.PortofLoading.Name = event.Name;
    this.validateOrderForm();
  }

  selectFinalDestination(event) {
    this.invoice.FinalDestination = event;
    this.invoice.FinalDestination.Name = event.Name;
    this.validateOrderForm();
  }



  selectCurrency(event) {
    this.item.Currency = {
      CurrencyId: event.CurrencyId,
      CurrencyName: event.CurrencyName
    };
    this.validateItemForm();
  }

  selectItems(items) {
    // debugger;
    console.log('Invoice.Items', this.invoice.Items);
    let itemList = [...this.invoice.Items];
    items.forEach((item) => {
      let found: boolean = false;
      itemList.forEach((i) => {
        if (item.OrderId == i.OrderId
          && item.StyleDefinition.StyleNumber == i.StyleNumber) {
          found = true;
          i.Quantity += item.Quantity;
          i.FXAmount = i.Quantity * i.FXPrice;
          let ciio: CommercialInvoiceItemOrder = new CommercialInvoiceItemOrder();
          if (i.ItemId)
            ciio.InvoiceItemId = i.ItemId;
          ciio.OrderItemId = item.ItemId;
          i.OrderItems.push(ciio);
        }
      });

      if (!found) {
        let i: CommercialInvoiceItem = new CommercialInvoiceItem();
        i.ItemName = item.StyleDefinition.ItemName;
        i.StyleNumber = item.StyleDefinition.StyleNumber;
        i.OrderId = item.OrderId;
        i.OrderNo = item.OrderNo;
        i.Quantity = item.Quantity;
        i.FXPrice = item.FXPrice;
        i.Currency = item.Currency;
        i.FXAmount = i.Quantity * i.FXPrice;
        let ciio: CommercialInvoiceItemOrder = new CommercialInvoiceItemOrder();
        ciio.OrderItemId = item.ItemId;
        i.OrderItems.push(ciio);
        itemList.push(i);
      }
    });
    this.invoice.Items = itemList;
    this.validateItemForm();

  }

  selectVendor(event) {
    this.invoice.Vendor = event;//{ Code: event.Code, Name: event.Name };
    this.invoice.VendorStr = event.Code + ' - ' + event.Name;
    this.validateOrderForm();
  }


  validateItemForm() {
    if (this.itemf.valid) {
      this.canSubmitItemForm = true;
    }
  }

  validateOrderForm() {
    debugger;
    if (
      this.invoicef.valid
      && this.invoice.Items.length > 0
      && this.invoice.OriginCountry.CountryId > 0
      && this.invoice.PortofLoading.Name
      && this.invoice.Priority.Name
      && this.invoice.Shipper.Name
      && this.invoice.VendorStr
    ) {
      this.canSubmitInvoiceForm = true;
    }else{
      this.canSubmitInvoiceForm = false;
    }
  }

  onShowButton(): void {
    this._display = true;
  }

  onCancel() {
    //  console.log("CommercialInvoiceComponent --- onCancel");
    this._display = false;
  }

  onSubmit() {
    //  debugger;
    let file = (<HTMLInputElement>document.getElementById("file")).files[0];

    if (file) {
      this.commercialOrderService.saveAttachment(file).subscribe(res => {
        if (res.Success) {
          this.invoice.AttachmentId = res.Item;
          this.commercialOrderService
            .saveCommercialInvoice(this.invoice)
            .subscribe(res => {
              console.log('res', res);
              if (res.Success) {
                this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The invoice saved successfully' });
                this.router.navigateByUrl(
                  this.nextPage
                );
              }
            });
        }
      });
    } else {
      this.commercialOrderService
        .saveCommercialInvoice(this.invoice)
        .subscribe(res => {
          console.log('res', res);
          if (res.Success) {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The invoice saved successfully' });
            this.router.navigateByUrl(
              "/pages/transactions/commercialInvoice/searchCommercialInvoice"
            );
          }
        });
    }

  }

  onSubmitItem() {
  //  console.log("CommercialInvoiceComponent --- onSubmitItem");
    this.addItem();
    this._display = false;
    this.validateOrderForm();
  }

  calculateAmount() {
    if (this.item.Quantity > 0 && this.item.FXPrice > 0) {
      this.item.FXAmount = this.item.Quantity * this.item.FXPrice;
      this.validateItemForm();
    }
  }

  fileChanged($event): void {

    console.log("MyApp.fileChanged");


    let file = (<HTMLInputElement>document.getElementById("file")).files[0];

    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);

  }

  downloadAttachment() {
    this.commercialOrderService.getAttchment(this.invoice.AttachmentId).subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
