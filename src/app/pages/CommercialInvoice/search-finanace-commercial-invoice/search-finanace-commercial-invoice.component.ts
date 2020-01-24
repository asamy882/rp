import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs/observable/from";
import { Message, ConfirmationService } from 'primeng/primeng';
import { CommercialInvoiceService } from '../commercial-invoice.service';
import { CommercialInvoice } from '../commercial-invoice';


@Component({
  selector: "app-search-finanace-commercial-invoice",
  templateUrl: "./search-finanace-commercial-invoice.component.html",
  styleUrls: ["./search-finanace-commercial-invoice.component.css"]
})
export class SearchFinanaceCommercialInvoiceComponent implements OnInit {

  commercialInvoices: CommercialInvoice[];
  selectedInvoice: CommercialInvoice;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;
  display: boolean;
  invoice: CommercialInvoice;
  canSubmitForm: boolean = false;

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  filterItemsClicked() {
    (this.isItemsFilter) ? this.isItemsFilter = false : this.isItemsFilter = true;
  }

  constructor(
    private router: Router,
    private commercialInvoiceService: CommercialInvoiceService,
    private confirmationService: ConfirmationService
  ) { }


  preEditInvoice(invoice) {
    console.log("preEditInvoice", invoice);
    this.invoice = invoice;
    if (!this.invoice.PaymentStatus) {
      this.invoice.PaymentStatus = {};
    }
    this.display = true;
  }

  editInvoice() {
    // console.log("editInvoice", invoice);
    this.commercialInvoiceService
      .updateCommercialInvoice(this.invoice)
      .subscribe(res => {
        console.log('res', res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The invoice saved successfully' });
          this.invoice = new CommercialInvoice();
          this.commercialInvoiceService.getCommercialInvoicesForFinanace().subscribe(res => {
            if (res.Success) {
              this.commercialInvoices = res.Items;
             /* debugger;
              res.Items.forEach(invoice => {
                invoice.Items.forEach(i => {
                  i.FXAmount = i.FXPrice * i.Quantity;
                });
              });*/
            }
          });
        }
      });
    this.display = false;
  }

  ngOnInit() {
    this.invoice = new CommercialInvoice();
    this.commercialInvoiceService.getCommercialInvoicesForFinanace().subscribe(res => {
      if (res.Success) {
        this.commercialInvoices = res.Items;
       /* debugger;
        res.Items.forEach(invoice => {
          invoice.Items.forEach(i => {
            i.FXAmount = i.FXPrice * i.Quantity;
          });
        });*/
      }
    });
  }

  selectPriority(event) {
    this.invoice.PaymentStatus = event;
    this.valiadteForm();
  }

  valiadteForm() {
    if (this.invoice.PaymentStatus.Name
      && this.invoice.DateofFinanace) {
      this.canSubmitForm = true;
    } else {
      this.canSubmitForm = false;
    }

  }

  changePaymentStatus(statusId){
    this.invoice.PaymentStatus.Id  = parseInt(statusId);
  }


}
