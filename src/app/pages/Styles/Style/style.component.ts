import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Style } from "../../Lookups/Styles/style.interface";
import { StyleService } from "../styles.service";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit {

  //saved Object
  styles: Style[];
  style: Style;
  display: boolean;
  colDefs: any[] = [];
  msgs: Message[] = [];
  canSubmitStyleForm: boolean;
  @ViewChild("styleForm") styleForm: any;

  constructor(private modalService: NgbModal, private styleService: StyleService) {
    this.createColDefs()
  }

  ngOnInit(): void {
    this.getALLStyles();
    this.resetValues();
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

  getALLStyles() {
    this.styleService.getStyles().subscribe((res) => {
      if (res.Success) {
        this.styles = res.Items;
        this.styleService.saveObjectOnLocalStorage('Styles',JSON.stringify(this.styles));
      }
    }
    )
  }

  onSubmit() {
    this.styleService
      .saveStyle(this.style)
      .subscribe(res => {
        console.log("saveStyle", res);
        if (res.Success) {
          this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The style saved successfully' });
          this.getALLStyles();
          this.display = false;
        }else{
          this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Failed to save the style' });
        }
      });

  }

  resetValues() {
    this.style = {};
    this.style.ItemGroup1 = {};
    this.style.ItemGroup2 = {};
    this.style.ItemGroup3 = {};
    this.style.ItemGroup4 = {};
    this.style.ItemGroup5 = {};
    this.styleForm.reset();
  }

  addClicked() {
    this.display = true;
    this.resetValues();
  }

  deleteClicked(){
    this.styleService.deleteStyle(this.style.StyleNumber).subscribe((res) =>
    {
      console.log("deleteStyle - res", res);
      if (res.Success) {
        let index = this.styles.indexOf(this.style);
        this.styles = this.styles.filter(
          (val, i) => i != index
        );
        this.styleService.saveObjectOnLocalStorage('Styles',JSON.stringify(this.styles));
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'The style deleted successfully' });
      } else {
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Faild to delete the style' });
      }
    }

    );
  }

  editClicked(){
    this.display = true;
  }

  rowSelected(style){
    this.style = style;
  }

  selectItemGroup1(item){
    this.style.ItemGroup1 = item;
    this.valiadteForm();
  }

  selectItemGroup2(item){
    this.style.ItemGroup2 = item;
    this.valiadteForm();
  }

  selectItemGroup3(item){
    this.style.ItemGroup3 = item;
    this.valiadteForm();
  }

  selectItemGroup4(item){
    this.style.ItemGroup4 = item;
    this.valiadteForm();
  }

  selectItemGroup5(item){
    this.style.ItemGroup5 = item;
    this.valiadteForm();
  }

  valiadteForm(){
    if(this.styleForm.valid
      && this.style.ItemGroup1.Code
      && this.style.ItemGroup2.Code
      && this.style.ItemGroup3.Code
      && this.style.ItemGroup4.Code
      && this.style.ItemGroup5.Code
    )
    this.canSubmitStyleForm = true;
  }
}
