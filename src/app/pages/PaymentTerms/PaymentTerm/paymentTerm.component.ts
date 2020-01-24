import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaymentTerm } from "../../Lookups/PaymentTerms/paymentTerm.interface";
import { PaymentTermService } from "../paymentTerms.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-paymentTerm',
  templateUrl: './paymentTerm.component.html',
  styleUrls: ['./paymentTerm.component.css']
})
export class PaymentTermComponent implements OnInit {

  //saved Object
  paymentTerms: PaymentTerm[];
  paymentTerm: PaymentTerm;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitPaymentTermForm: boolean;
  @ViewChild("paymentTermForm") paymentTermForm: any;

  constructor(private modalService: NgbModal, private paymentTermService: PaymentTermService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLPaymentTerms();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'TermId', 'header': 'Term Id' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Name' });
    this.colDefs.push({ 'field': 'Description', 'header': 'Description' });
  }

  getALLPaymentTerms() {
    this.paymentTermService.getPaymentTerms().subscribe((res) => {
      if (res.Success) {
        this.paymentTerms = res.Items;
        this.paymentTermService.saveObjectOnLocalStorage('PaymentTerms',JSON.stringify(this.paymentTerms));
      }
    }
    )
  }

  onSubmit() {
    console.log('onSubmit');

    this.paymentTermService
      .savePaymentTerm(this.paymentTerm)
      .subscribe(res => {
        console.log("savePaymentTerm", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The paymentTerm saved successfully' });
          this.getALLPaymentTerms();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the paymentTerm' });
        }
      });

  }

  resetValues() {
    this.paymentTerm = {};
    this.paymentTermForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    if (confirm("Are you sure to delete selected paymentTerm")) {
      this.paymentTermService.deletePaymentTerm(this.paymentTerm.TermId).subscribe((res) =>
      {
        console.log("deletePaymentTerm - res", res);
        if (res.Success) {
          let index = this.paymentTerms.indexOf(this.paymentTerm);
          this.paymentTerms = this.paymentTerms.filter(
            (val, i) => i != index
          );
          this.paymentTermService.saveObjectOnLocalStorage('PaymentTerms',JSON.stringify(this.paymentTerms));
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The paymentTerm deleted successfully' });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the paymentTerm' });
        }
      }

      )
    }
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(paymentTerm){
    this.paymentTerm = paymentTerm;
  }

  valiadteForm(){
    if(this.paymentTermForm.valid)
    this.canSubmitPaymentTermForm = true;
  }
}
