import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Supplier } from "../../Lookups/Suppliers/supplier.interface";
import { SupplierService } from "../suppliers.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  //saved Object
  suppliers: Supplier[];
  supplier: Supplier;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitSupplierForm: boolean;
  @ViewChild("supplierForm") supplierForm: any;

  constructor(private modalService: NgbModal, private supplierService: SupplierService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLSuppliers();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Code', 'header': 'Code' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Name' });
    this.colDefs.push({ 'field': 'Description', 'header': 'Description' });
    this.colDefs.push({ 'field': 'AccountNo', 'header': 'AccountNo' });
    this.colDefs.push({ 'field': 'Country.Name', 'header': 'Country' });
  }

  getALLSuppliers() {
    this.supplierService.getSuppliers().subscribe((res) => {
      if (res.Success) {
        this.suppliers = res.Items;
        this.supplierService.saveObjectOnLocalStorage('Suppliers',JSON.stringify(res.Items));
      }
    }
    )
  }

  onSubmit() {
    this.supplierService
      .saveSupplier(this.supplier)
      .subscribe(res => {
        console.log("saveSupplier", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The supplier saved successfully' });
          this.getALLSuppliers();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the supplier' });
        }
      });
      //this.supplierService.removeObjectFromLocalStorage("Suppliers");
  }

  resetValues() {
    this.supplier = {};
    this.supplier.Country = {};
    this.supplierForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    this.supplierService.deleteSupplier(this.supplier.Code).subscribe((res) =>
    {
      console.log("deleteSupplier - res", res);
      if (res.Success) {
        let index = this.suppliers.indexOf(this.supplier);
        this.suppliers = this.suppliers.filter(
          (val, i) => i != index
        );
        this.supplierService.saveObjectOnLocalStorage('Suppliers',JSON.stringify(this.suppliers));
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The supplier deleted successfully' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the supplier' });
      }
    }
    );
   // this.supplierService.removeObjectFromLocalStorage("Suppliers");
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(supplier){
    this.supplier = supplier;
  }

  selectCountry(country){
    this.supplier.Country = country;
    this.valiadteForm();
  }

  valiadteForm(){
    if(this.supplierForm.valid
      && this.supplier.Country.CountryId
    )
    this.canSubmitSupplierForm = true;
  }
}
