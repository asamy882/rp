import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FigureViewCriteria } from './figure.view.criteria';
import { FigureViewService } from './figure.view.service';
import { months } from 'moment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: "NgReport",
  templateUrl: "./figure.view.component.html",
  styleUrls: ["./figure.view.component.css"]
})
export class FigureViewComponent {
  @Input()
  rowData: any[] = [];
  @Input()
  months: any [] = [];
  @Input()
  url: string;
  criteria: FigureViewCriteria = new FigureViewCriteria();
  isFilter: boolean;
  season: string;
  monthListMap : Map<number, string> = new Map<number, string>();
  tOS: number = 0;
  tVal: number = 0;
  tVol: number = 0;
  tAUP: number = 0;
  tAvg: number = 0;
  tMonthWeight: number = 0;
  tSellThru: number = 0;
  viewResult: boolean = false;
  enableButton: boolean = false;
  branch: any = {};


  constructor(private service: FigureViewService) {
    this.monthListMap.set(1 , 'Jan');
    this.monthListMap.set(2 , 'Feb');
    this.monthListMap.set(3 , 'Mar');
    this.monthListMap.set(4 , 'Apr');
    this.monthListMap.set(5 , 'May');
    this.monthListMap.set(6 , 'Jun');
    this.monthListMap.set(7 , 'Jul');
    this.monthListMap.set(8 , 'Aug');
    this.monthListMap.set(9 , 'Sep');
    this.monthListMap.set(10 , 'Oct');
    this.monthListMap.set(11 , 'Nov');
    this.monthListMap.set(12 , 'Dec');
  }

  search() {
    this.service.getFigures(this.criteria).subscribe(res =>{
      console.log('search - res',res);
      if(true || res.Success){
        this.rowData = res.Items;
        this.viewResult = true;
        this.months = [];
        this.tOS = 0;
        this.tAUP= 0;
        this.tAvg = 0;
        this.tMonthWeight = 0;
        this.tSellThru = 0;
        this.tVol = 0;
        this.tVal = 0;
       res.Items.forEach(element => {
          this.months.push(this.monthListMap.get(element.FigureMonth)+ " " +element.FigureYear);
          this.tOS += element.OpenStock;
          this.tAUP += element.AvgUnitPrice;
          this.tAvg += element.AvgDiscount;
          this.tMonthWeight += element.MonthWeight;
          this.tSellThru += element.SellThru;
          this.tVol += element.Volum;
          this.tVal += element.Value;
        });
       /* if(this.colDefinition.length == 0){
          if(this.rowData.length > 0){
            for(var key in this.rowData[0])
              {
                this.colDefinition.push({ 'field': key, 'header': key });
              }
          }
        }*/
      }
    });

  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

  selectBranch(event) {
    this.branch = event;
    this.criteria.BranchId = event.Id;
    this.validateForm();
  }
  selectSeason(event) {
    //  debugger;
    //  console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    this.validateForm();
  }
  validateForm(){
    if(this.criteria.BranchId &&
    this.criteria.SeasonID){
      this.enableButton = true;
    } else{
      this.enableButton = false;
    }
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
