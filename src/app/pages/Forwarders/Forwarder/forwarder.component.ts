import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Forwarder } from "../../Lookups/Forwarders/forwarder.interface";
import { ForwarderService } from "../forwarders.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent implements OnInit {

  //saved Object
  forwarders: Forwarder[];
  forwarder: Forwarder;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitForwarderForm: boolean;
  @ViewChild("forwarderForm") forwarderForm: any;

  constructor(private modalService: NgbModal, private forwarderService: ForwarderService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLForwarders();
    this.resetValues();
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'Code', 'header': 'Forwarder Code' });
    this.colDefs.push({ 'field': 'Name', 'header': 'Forwarder Name' });
    this.colDefs.push({ 'field': 'AccountNo', 'header': 'Account No' });
    this.colDefs.push({ 'field': 'ContactPerson', 'header': 'Contact Person' });
    //this.colDefs.push({ 'field': 'Country.Name', 'header': 'Country of Origin' });
  }

  getALLForwarders() {
    this.forwarderService.getForwarders().subscribe((res) => {
      if (res.Success) {
        this.forwarders = res.Items;
        this.forwarderService.saveObjectOnLocalStorage('Forwarders',JSON.stringify(this.forwarders));
      }
    }
    )
  }

  onSubmit() {
    console.log('onSubmit');

    this.forwarderService
      .saveForwarder(this.forwarder)
      .subscribe(res => {
        console.log("saveForwarder", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The forwarder saved successfully' });
          this.getALLForwarders();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the forwarder' });
        }
      });

  }

  resetValues() {
    this.forwarder = new Forwarder();
    this.forwarder.Country = {CountryId : 0};
    this.forwarderForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    this.forwarderService.deleteForwarder(this.forwarder.Code).subscribe((res) =>
      {
        console.log("deleteForwarder - res", res);
        if (res.Success) {
          let index = this.forwarders.indexOf(this.forwarder);
          this.forwarders = this.forwarders.filter(
            (val, i) => i != index
          );
          this.forwarderService.saveObjectOnLocalStorage('Forwarders',JSON.stringify(this.forwarders));
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The forwarder deleted successfully' });
        } else {
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the forwarder' });
        }
      }

      );
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(forwarder){
    this.forwarder = forwarder;
  }

  selectCountry(country){
    this.forwarder.Country = country;
    this.valiadteForm();
  }

  valiadteForm(){
    if(this.forwarderForm.valid
     // && this.forwarder.Country.Name
    )
    this.canSubmitForwarderForm = true;
  }
}
