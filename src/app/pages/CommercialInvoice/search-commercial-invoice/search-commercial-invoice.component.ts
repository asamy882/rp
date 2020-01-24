import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs/observable/from";
import { Message, ConfirmationService } from 'primeng/primeng';
import { CommercialInvoiceService } from '../commercial-invoice.service';
import { CommercialInvoice } from '../commercial-invoice';


@Component({
  selector: "app-search-commercial-invoice",
  templateUrl: "./search-commercial-invoice.component.html",
  styleUrls: ["./search-commercial-invoice.component.css"]
})
export class SearchCommercialInvoiceComponent implements OnInit {

  commercialInvoices: CommercialInvoice[];
  selectedInvoice: CommercialInvoice;
  msgs: Message[] = [];
  isFilter: boolean = false;
  isItemsFilter: boolean = false;

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

  addNewInvoice() {
    this.router.navigateByUrl("/pages/commercialInvoice/commercialInvoice");
  }

  editInvoice(invoice) {
    console.log("editInvoice", invoice);
    this.router.navigateByUrl(
      "/pages/transactions/commercialInvoice/commercialInvoice/edit/" + invoice.InvoiceId
    );
  }

  ngOnInit() {
    this.commercialInvoiceService.getCommercialInvoices().subscribe(res => {
      if (res.Success) {
        this.commercialInvoices = res.Items;
        this.commercialInvoices.forEach(invoice => {
          invoice.Items.forEach( i => {
            i.FXAmount = i.FXPrice * i.Quantity;
          });
        });
      }
    });
  }

  deleteInvoice(invoice) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.commercialInvoiceService
          .deleteCommercialInvoice(invoice.InvoiceId)
          .subscribe(res => {
            if (res.Success) {
              let index = this.commercialInvoices.indexOf(invoice);
              this.commercialInvoices = this.commercialInvoices.filter(
                (val, i) => i != index
              );
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The invoice deleted successfully' });
            } else {
              this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the invoice' });
            }
          });
      }
    });
  }
}
