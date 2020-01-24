import { Component, ViewChild, OnInit } from "@angular/core";
import { Shipment } from "../shipment";
import { ShipmentExpense } from "../shipment.expense";
import { ShipmentService } from "../shipment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message } from 'primeng/primeng';
import { log } from "util";
import { CommercialInvoice } from '../../CommercialInvoice/commercial-invoice';
import { CommercialInvoiceService } from '../../CommercialInvoice/commercial-invoice.service';
import { ConfirmationService } from "primeng/primeng";
import { WorkflowService } from '../../components/workflow/workflow.service';
import { Task } from '../../components/workflow/task';



@Component({
  selector: "app-shipment",
  templateUrl: "./shipment.component.html",
  styleUrls: ["./shipment.component.css"]
})
export class ShipmentComponent implements OnInit {
  _modal: boolean = true;
  _width: number = 700;
  isNewExpense: boolean;
  editMode: boolean;
  display: boolean = false;
  colDefs: any[] = [];
  shipment: Shipment;
  expense: ShipmentExpense;
  canSubmitExpenseForm: boolean;
  canSubmitOrderForm: boolean;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;
  viewMode: boolean = false;
  task: Task = new Task();
  taskId: number;
  canDownloadAttachment: boolean = false;
  nextPage: string = "/pages/transactions/shipment/searchShipment";

  @ViewChild("ShipmentExpenseForm") expensef: any;
  @ViewChild("shipmentForm") shipmentf: any;

  constructor(
    private shipmentService: ShipmentService,
    private activatedRoute: ActivatedRoute,
    private commercialInvoiceService: CommercialInvoiceService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private workflowService: WorkflowService
  ) { }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  PreAddOrder() {
    this.resetOrderValues();
    this.shipmentService.getNextShipmentNo().subscribe(res => {
      this.shipment.ShipmentNo = res.Item;
    });
    this.resetExpenseValues();
    this.canSubmitOrderForm = false;
  }

  resetOrderValues() {
    this.shipment = new Shipment();
  }

  resetExpenseValues() {
    this.expense = new ShipmentExpense();
    this.expensef.reset();
  }

  preAddExpense() {
    this.resetExpenseValues();
    this.isNewExpense = true;
    this.expensef.reset();
    this.display = true;
    this.canSubmitExpenseForm = false;
  }

  preUpdateExpense() {
    //this.expense = expense;
    this.isNewExpense = false;
    this.display = true;
  }

  deleteExpense() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.shipment.ShipmentExpenses.indexOf(this.expense);
        this.shipment.ShipmentExpenses = this.shipment.ShipmentExpenses.filter((val, i) => i != index);
      }
    });
  }

  deleteInvoice(invoice) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let index = this.shipment.ShipmentInvoices.indexOf(invoice);
        this.shipment.ShipmentInvoices = this.shipment.ShipmentInvoices.filter((val, i) => i != index);
        this.shipment.TotalAmount -= invoice.TotalAmount;
        this.shipment.TotalQuantity -= invoice.TotalQuantity;
      }
    });
  }

  addExpense() {
    let expenses = [...this.shipment.ShipmentExpenses];
    if (this.isNewExpense) {
      expenses.push(this.expense);
    }
    this.shipment.ShipmentExpenses = expenses;
  }

  ngOnInit() {
    this.createColDefs();
    let id = this.activatedRoute.snapshot.params["id"];
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    //  console.log("Id", id);
    if (id != null) {
      //debugger;
      this.editMode = true;
      this.viewMode = false;
      this.resetOrderValues();
      this.resetExpenseValues();
      this.canSubmitOrderForm = true;
      this.shipmentService
        .getShipmentById(id)
        .subscribe(res => {
          if (res.Success) {
            this.shipment = res.Item;
            if (this.shipment.AttachmentId &&
              this.shipment.AttachmentId > 0)
              this.canDownloadAttachment = true;
          }
        });
    } else if (this.taskId != null) {
      this.viewMode = true;
      this.editMode = false;
      this.resetOrderValues();

      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.shipmentService
            .getShipmentById(this.task.TransactionId)
            .subscribe(res => {
              if (res.Success) {
                this.shipment = res.Item;
                if (this.shipment.AttachmentId &&
                  this.shipment.AttachmentId > 0)
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

  selectInvoices(invoices) {
    let invoiceList = [...this.shipment.ShipmentInvoices];
    invoices.forEach((invoice) => {
      this.commercialInvoiceService
        .getCommercialInvoiceById(invoice.InvoiceId)
        .subscribe(res => {
          if (res.Success) {
            res.Item.Items.forEach( i => {
              i.FXAmount = i.FXPrice * i.Quantity;
            });
            invoiceList.push(res.Item);
            this.shipment.TotalQuantity += res.Item.TotalQuantity;
            this.shipment.TotalAmount += res.Item.TotalAmount;
            this.shipment.ShipmentInvoices = invoiceList;
            invoiceList = [...this.shipment.ShipmentInvoices];
          }
        });
    });
    this.validateOrderForm();
  }


  validateExpenseForm() {
    if (this.expensef.valid
      && this.expense.Currency.CurrencyName
      && this.expense.Expense.Name) {
      this.canSubmitExpenseForm = true;
    }
  }

  validateOrderForm() {
    if (
      (this.shipmentf.valid || this.editMode) &&
      this.shipment.ShipmentExpenses.length > 0
      && this.shipment.ShipmentInvoices.length > 0
      && this.shipment.ShipmentFrom.Name
      && this.shipment.ShipmentNo
      && this.shipment.ShipmentTo.Name
      && this.shipment.ShippingTerm.Name
      /*  && this.shipment.StorageDaysAvg
          && this.shipment.ShipmentDate
          && this.shipment.StorageFees
          && this.shipment.ActualArrivaldDate
          && this.shipment.ActualShippingDate
          && this.shipment.ActualWHDate
          && this.shipment.AgreedArrivaldDate
          && this.shipment.AgreedShippingDate
          && this.shipment.AgreedWHDate*/
      && this.shipment.Clearance.Name
      && this.shipment.Forwarder.Name
      && this.shipment.PaymentTerm.Name
      && this.shipment.PortOfDischarge.Name
      && this.shipment.PortofLoading.Name
      && this.shipment.Season.Name
    ) {
      this.canSubmitOrderForm = true;
    }
  }

  selectSeason(season) {
    this.shipment.Season = season;
    this.validateOrderForm();
  }

  selectForwarder(forwarder) {
    this.shipment.Forwarder = forwarder;
    this.validateOrderForm();
  }

  selectPaymentTerms(paymentTerms) {
    this.shipment.PaymentTerm = paymentTerms;
    this.validateOrderForm();
  }

  selectShippingTerms(shippingTerm) {
    this.shipment.ShippingTerm = shippingTerm;
    this.validateOrderForm();
  }

  selectShipmentTo(shipmentTo) {
    this.shipment.ShipmentTo = shipmentTo;
    this.validateOrderForm();
  }

  selectShipmentFrom(shipmentFrom) {
    this.shipment.ShipmentFrom = shipmentFrom;
    this.validateOrderForm();
  }

  selectPortofLoadings(portofLoadings) {
    this.shipment.PortofLoading = portofLoadings;
    this.validateOrderForm();
  }

  selectFinalDestinations(portofDischarge) {
    this.shipment.PortOfDischarge = portofDischarge;
    this.validateOrderForm();
  }

  selectClearanceAgency(clearanceAgency) {
    this.shipment.Clearance = clearanceAgency;
    this.validateOrderForm();
  }

  selectCurrency(currency) {
    this.expense.Currency = currency;
    this.validateExpenseForm();
  }

  selectExpense(expense) {
    this.expense.Expense = expense;
    this.validateExpenseForm();
  }

  onShowButton(): void {
    this.display = true;
  }

  onCancel() {
    console.log("ShipmentComponent --- onCancel");
    this.display = false;
  }

  onSubmit() {
    let file = (<HTMLInputElement>document.getElementById("file")).files[0];
    if (file) {
      this.shipmentService.saveAttachment(file).subscribe(res => {
        if (res.Success) {
          this.shipment.AttachmentId = res.Item;
          this.shipmentService
            .saveShipment(this.shipment)
            .subscribe(res => {
              console.log("saveShipment", res);
              if (res.Success) {
                this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The shipment saved successfully' });
                this.router.navigateByUrl(
                  this.nextPage
                );
              } else {
                this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the shipment' });
              }
            });
        }
      });
    } else {
      this.shipmentService
        .saveShipment(this.shipment)
        .subscribe(res => {
          console.log("saveShipment", res);
          if (res.Success) {
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The shipment saved successfully' });
            this.router.navigateByUrl(
              this.nextPage
            );
          } else {
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the shipment' });
          }
        });
    }
  }

  onSubmitExpense() {
    this.addExpense();
    this.display = false;
    this.resetExpenseValues();
    this.validateOrderForm();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Expense.Name', 'header': 'Expense Name' });
    this.colDefs.push({ 'field': 'Currency.CurrencyName', 'header': 'Currency' });
    this.colDefs.push({ 'field': 'AgrredAmount', 'header': 'Agreed Amount' });
    this.colDefs.push({ 'field': 'ActualAmount', 'header': 'Actul Amount' });

  }

  expenseSelected(expense) {
    this.expense = expense;
  }

  downloadAttachment() {
    this.shipmentService.getAttchment(this.shipment.AttachmentId).subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
