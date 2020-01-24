import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SeasonOTBService } from './seasonotb.service';
import { Season } from '../Seasons/season.class';
import { Task } from '../components/workflow/task';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: "NgOTB",
  templateUrl: "./seasonotb.component.html",
  styleUrls: ["./seasonotb.component.css"]
})
export class SeasonOTBComponent implements OnInit {

  items: any[] = [];
  weights:any[] = [];
  itemsCount:number;
  otb: any;
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  enableSaveDraft: boolean = false;
  season: Season = new Season();
  msgs: Message[] = [];
  task: Task = new Task();
  taskId: number;
  viewMode: boolean = false;
  @ViewChild('tbody') businessPlanTable: any;

  constructor(private service: SeasonOTBService) {
  
  }

  getOTB() {
    this.service.getSeasonOTB(this.season.SeasonID).subscribe(res => {
      console.log('getSeasonOTB - res', res);
      if (res.Success) {        
        this.enableGet = false; 
        this.items = res.Items;
        this.viewResult = true;  
        this.enableSave=true;   
        this.itemsCount=this.items.length;  
      }
    });
    this.service.getOTBStoreWeights(this.season.SeasonID).subscribe(res => {
      console.log('getOTBStoreWeights - res', res);
      if (res.Success) {  
        this.weights = res.Items;      
      }
    });
  }

  onSubmit() {
    this.otb=this.items[this.items.length-1];
    this.service
      .SaveSeasonOTB(this.otb)
      .subscribe(res => {
        console.log("SaveOTB", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The OTB saved and submitted successfully' });

        }
      });
  }

  otbAmountChanged(genderIndex) {
    debugger;
    let genderOtbQty = 0;
    let item = this.items[genderIndex].Childs.forEach(line => {
      line.Childs.forEach(itemName => {
        itemName.Childs.forEach(desc => {
          genderOtbQty += parseInt(desc.OTBQTY);
        });
      });
    });

    this.items[genderIndex].OTBQTY = genderOtbQty;
  }
  ngOnInit() {
   
  }
  selectSeason(event) {
    console.log('selectSeason', event);
    this.season = event;
    this.enableGet = true;
  }

  validateForm() {

  }

  exportAsXLSX(){
    debugger;
    this.exportAsExcelFile(document.getElementById("resulttable"),"SeasonOTB");
  }
  public exportAsExcelFile(table: HTMLElement, excelFileName: string): void {
    var config = { raw:true, type: 'base64',cellStyles:true }
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table,config);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
    //  var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    //  var url = window.URL.createObjectURL(blob);
    //  window.open(url);
  }
}
