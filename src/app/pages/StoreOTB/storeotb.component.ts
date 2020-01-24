import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { StoreOTBService } from './storeotb.service';
import { Season } from '../Seasons/season.class';
import { Task } from '../components/workflow/task';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: "NgOTB",
  templateUrl: "./storeotb.component.html",
  styleUrls: ["./storeotb.component.css"]
})
export class StoreOTBComponent implements OnInit {

  items: any[] = [];
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

  constructor(private service: StoreOTBService) {
  
  }

  getOTB() {
    this.service.getStoreOTB(this.season.SeasonID).subscribe(res => {
      console.log('getStoreOTB - res', res);
      if (res.Success) {        
        this.enableGet = false; 
        this.items = res.Items;
        this.viewResult = true;  
        this.enableSave=true;   
        this.itemsCount=this.items.length;  
      }
    });
  }

  onSubmit() {
 
    this.service
      .saveStoreOTB(this.items)
      .subscribe(res => {
        console.log("saveStoreOTB", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The OTB saved and submitted successfully' });

        }
      });
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
    this.exportAsExcelFile(document.getElementById("resulttable"),"FigureView");
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
