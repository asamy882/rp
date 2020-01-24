import { Component, ViewChild, OnInit } from "@angular/core";
import { Costing } from "../costing";
import { CostingCurrencyRate } from "../costing-currency-rate";
import { CostingService } from "../costing.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from 'primeng/primeng';
import { log } from "util";
import { ConfirmationService } from "primeng/primeng";
import { WorkflowService } from '../../components/workflow/workflow.service';
import { Task } from '../../components/workflow/task';



@Component({
  selector: "app-costing",
  templateUrl: "./costing.component.html",
  styleUrls: ["./costing.component.css"]
})
export class CostingComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  editMode: boolean;
  display: boolean = false;
  colDefs: any[] = [];
  costing: Costing;
  canSubmitExpenseForm: boolean;
  canSubmitOrderForm: boolean;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;
  isIvoicesFilter: boolean = false;
  isShipmentsFilter: boolean = false;
  viewMode: boolean = false;
  task: Task = new Task();
  taskId: number;
  nextPage: string = "/pages/transactions/costing/searchCosting";

  @ViewChild("costingForm") costingf: any;

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  filterIvoicesClicked() {
    (this.isIvoicesFilter) ? this.isIvoicesFilter = false : this.isIvoicesFilter = true;
  }

  filterShipmentsClicked() {
    (this.isShipmentsFilter) ? this.isShipmentsFilter = false : this.isShipmentsFilter = true;
  }

  constructor(
    private costingService: CostingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private workflowService: WorkflowService
  ) { }

  PreAddOrder() {
    this.resetOrderValues();
    this.canSubmitOrderForm = false;
  }

  resetOrderValues() {
    this.costing = new Costing();
    this.costingService.getCurrencies().subscribe((res) => {

      if (res.Success) {
        let list = [...this.costing.CurrencyRates];
        res.Items.forEach(c => {
          let ccr: CostingCurrencyRate = new CostingCurrencyRate();
          ccr.Currency = c;
          list.push(ccr);
          this.costing.CurrencyRates = list;
          list = [...this.costing.CurrencyRates];
        });
      }
    });
  }



  deleteShipment(shipment) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.costing.Shipments.indexOf(shipment);
        this.costing.Shipments = this.costing.Shipments.filter((val, i) => i != index);
      }
    });
  }

  calculate() {
    this.costingService.calculateCosting(this.costing).subscribe((res) => {
      console.log('costingService', res);
      this.costing.Items = res.Item.Items;
      this.costing.Items.forEach((item) => {
        item.TotalFX = item.Quantity * item.FXPrice;
        item.TotalCost = item.Quantity * item.UnitCost;
        item.TotalFX = parseFloat(item.TotalFX.toFixed(2));
        item.TotalCost = parseFloat(item.TotalCost.toFixed(2));
      });
    });
  }


  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    //  console.log("Id", id);
    if (id != null) {
      this.editMode = true;
      this.viewMode = false;
      this.resetOrderValues();
      this.costingService
        .getCostingById(id)
        .subscribe(res => {
          if (res.Success) {
            this.costing = res.Item;
            this.costing.Items.forEach((item) => {
              item.TotalFX = item.Quantity * item.FXPrice;
              item.TotalCost = item.Quantity * item.UnitCost;
              item.TotalFX = parseFloat(item.TotalFX.toFixed(2));
              item.TotalCost = parseFloat(item.TotalCost.toFixed(2));
            });
          }
        });
    } else if (this.taskId != null) {
      this.viewMode = true;
      this.editMode = false;
      this.resetOrderValues();
      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.costingService
            .getCostingById(this.task.TransactionId)
            .subscribe(res => {
              if (res.Success) {
                this.costing = res.Item;
                this.costing.Items.forEach((item) => {
                  item.TotalFX = item.Quantity * item.FXPrice;
                  item.TotalCost = item.Quantity * item.UnitCost;
                  item.TotalFX = parseFloat(item.TotalFX.toFixed(2));
                  item.TotalCost = parseFloat(item.TotalCost.toFixed(2));
                });
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

  selectShipments(shipments) {
    /* let invoiceList = [...this.costing.CostingInvoices];
      invoices.forEach((invoice) =>{
        this.shipmentService
        .getShipmentById(invoice.InvoiceId)
        .subscribe(res => {
          if (res.Success) {
            invoiceList.push(res.Item);
            res.Item.Items.forEach(i => { this.costing.TotalAmount += (i.FXPrice * i.Quantity);
              this.costing.TotalQTY += i.Quantity;
            });
            this.costing.CostingInvoices = invoiceList;
            invoiceList = [...this.costing.CostingInvoices];
          }
        });
      });*/
    this.costing.Shipments = shipments;
    this.validateOrderForm();
  }



  validateOrderForm() {
    if (
      (this.costingf.valid || this.editMode)
    ) {
      this.canSubmitOrderForm = true;
    }
  }



  onShowButton(): void {
    this.display = true;
  }

  onCancel() {
    console.log("CostingComponent --- onCancel");
    this.display = false;
  }

  onSubmit() {
    this.costingService
      .saveCosting(this.costing)
      .subscribe(res => {
        console.log("saveCosting", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The costing saved successfully' });
          this.router.navigateByUrl(
            this.nextPage
          );
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the costing' });
        }
      });
  }

  downloadAttachment(attachmentId) {
    console.log('attachmentId', attachmentId);
    this.costingService.getAttchment(attachmentId).subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }


}
