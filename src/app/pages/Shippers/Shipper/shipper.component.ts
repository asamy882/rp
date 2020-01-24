import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Shipper } from "../../Lookups/Shippers/shipper.interface";
import { ShipperService } from "../shippers.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  //saved Object
  shippers: Shipper[];
  shipper: Shipper;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitShipperForm: boolean;
  @ViewChild("shipperForm") shipperForm: any;

  constructor(private modalService: NgbModal, private shipperService: ShipperService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLShippers();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Code', 'header': 'Factory Code' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Factory Name' });
    this.colDefs.push({ 'field': 'Country.Name', 'header': 'Country of Origin' });
    this.colDefs.push({ 'field': 'Vendor.Name', 'header': 'Vendor Name' });
  }

  getALLShippers() {
    this.shipperService.getShippers().subscribe((res) => {
      if (res.Success) {
        this.shippers = res.Items;
        this.shipperService.saveObjectOnLocalStorage('Shippers',JSON.stringify(this.shippers));
      }
    }
    )
  }

  onSubmit() {
    this.shipperService
      .saveShipper(this.shipper)
      .subscribe(res => {
        console.log("saveShipper", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The shipper saved successfully' });
          this.getALLShippers();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the shipper' });
        }
      });

  }

  resetValues() {
    this.shipper = {};
    this.shipper.Vendor = {};
    this.shipper.Country = {};
    this.shipperForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    this.shipperService.deleteShipper(this.shipper.Code).subscribe((res) =>
      {
        console.log("deleteShipper - res", res);
        if (res.Success) {
          let index = this.shippers.indexOf(this.shipper);
          this.shippers = this.shippers.filter(
            (val, i) => i != index
          );
          this.shipperService.saveObjectOnLocalStorage('Shippers',JSON.stringify(this.shippers));
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The shipper deleted successfully' });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the shipper' });
        }
      }

      );
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(shipper){
    this.shipper = shipper;
  }

  selectVendor(vendor){
    this.shipper.Vendor = vendor;
    this.valiadteForm();
  }

  selectCountry(country){
    this.shipper.Country = country;
    this.valiadteForm();
  }

  valiadteForm(){
    if(this.shipperForm.valid
      && this.shipper.Vendor.Name
      && this.shipper.Country.Name
    )
    this.canSubmitShipperForm = true;
  }
}
