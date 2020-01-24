import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Style } from "../../Lookups/Styles/style.interface";
import { StyleService } from "../styles.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-style-upload',
  templateUrl: './uploadstylefromexcel.component.html',
  styleUrls: ['./uploadstylefromexcel.component.css']
})
export class UploadStyleFromExcelComponent implements OnInit {

  //saved Object
  invalidStyles: Style[];
  existStyles: Style[];
  validStyles: Style[];
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
showResult=false;
  @ViewChild("styleForm") styleForm: any;

  constructor(private modalService: NgbModal, private styleService: StyleService) {
    this.createColDefs()
  }

  ngOnInit(): void {
  }

  createColDefs(): any {
    this.colDefs.push({ 'field': 'StyleNumber', 'header': 'Item Code' });
    this.colDefs.push({ 'field': 'ItemName', 'header': 'Item Name' });
    this.colDefs.push({ 'field': 'ItemCode', 'header': 'Style Number' });
    this.colDefs.push({ 'field': 'ItemGroup1.Name', 'header': 'Gender' });
    this.colDefs.push({ 'field': 'ItemGroup2.Name', 'header': 'Line' });
    this.colDefs.push({ 'field': 'ItemGroup3.Name', 'header': 'Description' });
    this.colDefs.push({ 'field': 'ItemGroup4.Name', 'header': 'Shipment No' });
    this.colDefs.push({ 'field': 'ItemGroup5.Name', 'header': 'Season' });

  }
  validateExcelSheet(){
    this.showResult=false;
    let fileControl=<HTMLInputElement>document.getElementById("file");
    if(fileControl.files.length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select the file first' });
      return;
    }
    let file = fileControl.files[0];
    if (file) {
      this.styleService.validateStyleExcelSheet(file).subscribe(res => {
      
        if (res.Success) {
              this.invalidStyles=res.Item.InvaildRecords;
              this.existStyles=res.Item.ExistsRecords;
              this.validStyles=res.Item.UploadedRecords;
              this.showResult=true;
        }
        else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: res.Message });
          return;
        }
            });       
    }

  }
  UploadExcelSheet(){
    let fileControl=<HTMLInputElement>document.getElementById("file");
    if(fileControl.files.length==0){
      this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Please select the file first' });
      return;
    }
    let file = fileControl.files[0];
    if (file) {
      this.styleService.uploadStyleExcelSheet(file).subscribe(res => {
      
        if (res.Success) {
              this.invalidStyles=[];
              this.existStyles=[];
              this.validStyles=[];
              this.showResult=false;
              this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The excel sheet has been uploaded sucessfully. You have '+res.Item.UploadedRecords.length +' style definitions uploaded to the system.' });
        }
        else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: res.Message });
          return;
        }
            });       
    }

  }
}
