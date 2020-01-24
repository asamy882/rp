import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { SalesMonthsService } from './sales-months.service';
import { SalesMonthsCriteria } from './sales-months.criteria';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: "NgSalesMonths",
  templateUrl: "./sales-months.component.html",
  styleUrls: ["./sales-months.component.css"]
})
export class SalesMonthsComponent implements OnInit {

  planItems: any[] = [];
  plan: any;
  criteria: SalesMonthsCriteria = new SalesMonthsCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  CostCenter: string;
  months: string[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];
  season: string;
  branch: string;
  historyTotals: any[] = [];
  lastYear: string;
  currentYear: number;
  lastYearTotalBPValue: number = 0;
  totalBPValue = 0;
  lastYearTotalTrend: number = 0;
  totalTrend = 0;
  

  constructor(private service: SalesMonthsService) {
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

  getMonth(month) {
    return this.monthListMap.get(month);
  }

  getSalesMonths() {
    this.service.getSalesMonths(this.criteria).subscribe(res => {
      console.log('getSalesMonths - res', res);
      if (res.Success) {
        this.enableGet = false;
        this.enableSave = true;
        //this.plan = res.Item;
        this.viewResult = true;

        if (res.Items && res.Items.length > 0) {
          this.planItems = res.Items;         
          this.currentYear = 0;
          this.lastYear=this.planItems[0].PlanYear;
          this.planItems.forEach(element => {
            if (element.PlanYear > this.currentYear) this.currentYear = element.PlanYear;
            element.History.forEach(history => {
              let isNew = false;
              let totalElem = this.historyTotals.find(function (r) { return r.SalesYear == history.SalesYear })
              if (totalElem == null) {
                isNew = true;
                totalElem = {};
                totalElem.TotalBPValue = 0;
                totalElem.TotalAchieved = 0;
                totalElem.TotalActual = 0;
                totalElem.TotalDiscount = 0;
                totalElem.TotalGrowth = 0;
                totalElem.TotalPcsSold = 0;
                totalElem.SalesYear = history.SalesYear;
              }
              totalElem.TotalBPValue += history.BPValue;
              totalElem.TotalActual += history.Actual;
              totalElem.TotalAchieved = parseFloat((totalElem.TotalBPValue/ totalElem.TotalActual).toFixed(2));
              totalElem.TotalDiscount += history.Discount;
              totalElem.TotalGrowth += history.Growth;
              totalElem.TotalPcsSold += history.PcsSold;
              if (isNew) this.historyTotals.push(totalElem);
            });

          });
          this.calcTotal();
        }

      }
    });
  }

  calcTotal() {
    this.totalBPValue = 0;
    this.lastYearTotalBPValue=0;
    this.totalTrend = 0;
    this.lastYearTotalTrend=0;
    this.planItems.forEach(element => 
      {
      if(element.PlanYear==this.currentYear){
        this.totalBPValue+=parseFloat(element.BPValue);
        this.totalTrend+=parseFloat(element.Trend);
      }
      if(element.PlanYear==this.lastYear){
        this.lastYearTotalBPValue+=parseFloat(element.BPValue);
        this.lastYearTotalTrend+=parseFloat(element.Trend);
      }
    });
  }

  onSubmit() {
    this.service
      .SaveSalesMonths(this.planItems)
      .subscribe(res => {
        console.log("SaveSalesMonths", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }


  ngOnInit() {
  }

  selectBranch(event) {
    this.branch = event.Name;
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
  validateForm() {
    if (this.criteria.BranchId &&
      this.criteria.SeasonID) {
      this.enableGet = true;
    } else {
      this.enableGet = false;
    }
  }
  
  exportAsXLSX(){
    debugger;
    this.exportAsExcelFile(document.getElementById("resulttable"),"SalesMonths");
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
