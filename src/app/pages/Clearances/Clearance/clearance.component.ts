import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Clearance } from "../../Lookups/Clearances/clearance.interface";
import { ClearanceService } from "../clearances.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-clearance',
  templateUrl: './clearance.component.html',
  styleUrls: ['./clearance.component.css']
})
export class ClearanceComponent implements OnInit {

  //saved Object
  clearances: Clearance[];
  clearance: Clearance;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitClearanceForm: boolean;
  @ViewChild("clearanceForm") clearanceForm: any;

  constructor(private modalService: NgbModal, private clearanceService: ClearanceService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLClearances();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Code', 'header': 'Clearance Code' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Clearance Name' });
    this.colDefs.push({ 'field': 'AccountNo', 'header': 'Account No' });
    this.colDefs.push({ 'field': 'ContactPerson', 'header': 'Contact Person' });
    this.colDefs.push({ 'field': 'Country.Name', 'header': 'Country of Origin' });
  }

  getALLClearances() {
    this.clearanceService.getClearances().subscribe((res) => {
      if (res.Success) {
        this.clearances = res.Items;
        this.clearanceService.saveObjectOnLocalStorage('Clearances',JSON.stringify(this.clearances));
      }
    }
    )
  }

  onSubmit() {
    this.clearanceService
      .saveClearance(this.clearance)
      .subscribe(res => {
        console.log("saveClearance", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The clearance saved successfully' });
          this.getALLClearances();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the clearance' });
        }
      });

  }

  resetValues() {
    this.clearance = {};
    this.clearance.Country = {};
    this.clearanceForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    this.clearanceService.deleteClearance(this.clearance.Code).subscribe((res) =>
    {
      console.log("deleteClearance - res", res);
      if (res.Success) {
        let index = this.clearances.indexOf(this.clearance);
        this.clearances = this.clearances.filter(
          (val, i) => i != index
        );
        this.clearanceService.saveObjectOnLocalStorage('Clearances',JSON.stringify(this.clearances));
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The clearance deleted successfully' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the clearance' });
      }
    }

    )
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(clearance){
    this.clearance = clearance;
  }

  selectCountry(country){
    this.clearance.Country = country;
    this.valiadteForm();
  }

  valiadteForm(){
    if(this.clearanceForm.valid
      && this.clearance.Country.Name
    )
    this.canSubmitClearanceForm = true;
  }
}
