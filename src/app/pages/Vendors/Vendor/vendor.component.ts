import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Vendor } from "../../Lookups/Vendors/vendor.interface";
import { VendorService } from "../vendors.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  //saved Object
  vendors: Vendor[];
  vendor: Vendor;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitVendorForm: boolean;
  @ViewChild("vendorForm") vendorForm: any;

  constructor(private modalService: NgbModal, private vendorService: VendorService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    // debugger;
    this.getALLVendors();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Code', 'header': 'Vendor Code' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Vendor Name' });
    this.colDefs.push({ 'field': 'Country.Name', 'header': 'Country of Origin' });
    this.colDefs.push({ 'field': 'PaymentTerm.Name', 'header': 'Payment Term' });
    this.colDefs.push({ 'field': 'AccountNo', 'header': 'Account No' });
  }

  getALLVendors() {
    //debugger;
    this.vendorService.getVendors().subscribe((res) => {
      if (res.Success) {
        this.vendors = res.Items;
        this.vendorService.saveObjectOnLocalStorage('Suppliers', JSON.stringify(res.Items));
        this.vendors.forEach(v => {
          if (!v.PaymentTerm) v.PaymentTerm = {}
        });
      }
    }
    )
  }

  onSubmit() {
    this.vendorService
      .saveVendor(this.vendor)
      .subscribe(res => {
        console.log("saveVendor", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The vendor saved successfully' });
          this.getALLVendors();
          this.display = false;
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the vendor' });
        }
      });
  }

  resetValues() {
    this.vendor = {};
    this.vendor.Supplier = {};
    this.vendor.Country = {};
    this.vendor.PaymentTerm = {};
    this.vendorForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked() {
    this.vendorService.deleteVendor(this.vendor.Code).subscribe((res) => {
      console.log("deleteVendor - res", res);
      if (res.Success) {
        let index = this.vendors.indexOf(this.vendor);
        this.vendors = this.vendors.filter(
          (val, i) => i != index
        );
        this.vendorService.saveObjectOnLocalStorage('Suppliers', JSON.stringify(this.vendors));
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The vendor deleted successfully' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the vendor' });
      }
    }
    );
    //this.vendorService.removeObjectFromLocalStorage("Vendors");
  }

  editClicked() {
    this.display = true;
  }

  rowSelected(vendor) {
    this.vendor = vendor;
  }

  selectSupplier(supplier) {
    this.vendor.Supplier = supplier;
    this.valiadteForm();
  }

  selectCountry(country) {
    this.vendor.Country = country;
    this.valiadteForm();
  }

  selectPaymentTerm(paymentTerm) {
    this.vendor.PaymentTerm = paymentTerm;
    this.valiadteForm();
  }


  valiadteForm() {
    if (this.vendorForm.valid
      && this.vendor.Supplier.Code
      && this.vendor.Country.CountryId
      && this.vendor.PaymentTerm.TermId
    )
      this.canSubmitVendorForm = true;
  }
}
