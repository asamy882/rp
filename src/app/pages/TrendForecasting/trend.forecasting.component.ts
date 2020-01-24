import { Component } from '@angular/core';
import { TrendForecastingCriteria } from './trend.forecasting.criteria';
import { TrendForecastingService } from './trend.forecasting.service';
import { TrendForecasting } from './trend.forecasting';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: "trend-forecasting",
  templateUrl: "./trend.forecasting.component.html",
  styleUrls: ["./trend.forecasting.component.css"]
})
export class TrendForecastingComponent {

  criteria: TrendForecastingCriteria = new TrendForecastingCriteria();
  isFilter: boolean;
  season: string;
  trendForecastions: TrendForecasting[] = [];
  enableButton: boolean = false;
  viewResult: boolean = false;
  branch: any = {};
  monthListMap: Map<number, string> = new Map<number, string>();


  constructor(private service: TrendForecastingService) {
    this.monthListMap.set(1, 'Jan');
    this.monthListMap.set(2, 'Feb');
    this.monthListMap.set(3, 'Mar');
    this.monthListMap.set(4, 'Apr');
    this.monthListMap.set(5, 'May');
    this.monthListMap.set(6, 'Jun');
    this.monthListMap.set(7, 'Jul');
    this.monthListMap.set(8, 'Aug');
    this.monthListMap.set(9, 'Sep');
    this.monthListMap.set(10, 'Oct');
    this.monthListMap.set(11, 'Nov');
    this.monthListMap.set(12, 'Dec');
  }

  search() {
    this.service.getTrendForecasting(this.criteria).subscribe(res => {
     
      if (res.Success) 
      {
        this.trendForecastions = res.Items;
        this.trendForecastions.forEach(i => i.month = this.monthListMap.get(i.TrendMonth)+' '+i.TrendYear);  
        this.viewResult=true;     
         console.log('search - res', res);
      } 
      else 
      {
        this.trendForecastions = [];
        this.viewResult=false;   
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
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    this.validateForm();
  }

  validateForm() {
    if (this.criteria.BranchId &&
      this.criteria.SeasonID) {
      this.enableButton = true;
    } else {
      this.enableButton = false;
    }
  }
  exportAsXLSX(){
    debugger;
    this.exportAsExcelFile(document.getElementById("resulttable"),"TerndForecasting");
  }
  public exportAsExcelFile(table: HTMLElement, excelFileName: string): void {
    var config = { raw:true, type: 'string' }
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
