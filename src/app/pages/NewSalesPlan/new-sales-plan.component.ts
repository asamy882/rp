import { Component, EventEmitter, Input, Output, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/primeng';
import { NewSalesPlanService } from './new-sales-plan.service';
import { NewSalesPlanCriteria } from './new-sales-plan.criteria';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: "NgNewSalesPlan",
  templateUrl: "./new-sales-plan.component.html",
  styleUrls: ["./new-sales-plan.component.css"]
})
export class NewSalesPlanComponent implements OnInit {

  planItems: any[] = [];
  plan: any;
  criteria: NewSalesPlanCriteria = new NewSalesPlanCriteria();
  viewResult: boolean = false;
  viewMonths: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  branch: string;
  season: string;
  isWinter: boolean = false;
  months: any[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  cols: number;
  table1Width: number;
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];
  @ViewChild('tbody') businessPlanTable: any;

  constructor(private service: NewSalesPlanService, private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner) {
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
  private showLoading(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('assets/img/sky-bg.jpg'));
  }

private hideLoading():void{
  BaThemePreloader.load().then((values) => {
    this._spinner.hide();
  });
}


  exportData() {
    this.service.exportToExcel(this.plan.BPlanID).subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }

  downloadFile(data: any) {
    debugger;
    console.log('downloadFile', data);
    var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
    console.log('end downloadFile');
  }

  getNewSalesPlan() {

    this.service.getNewSalesPlan(this.criteria).subscribe(res => {
      console.log('findNewSalesPlan - res', res);
      if (res.Success) {
          this.enableGet = false;
          this.enableSave = true;
          this.plan = res.Item;
          this.planItems = res.Item.Items;
         //this.planItems.push(res.Item.Items[0]);
          this.viewResult = true;
          this.viewMonths = true;
          this.criteria.TotalPlannedQuantity = this.plan.TotalPlannedQuantity;
          this.criteria.BPlanID = this.plan.BPlanID;
          this.months = [];
          let date = new Date();
          res.Item.Months.forEach(m => {
            this.months.push({ Month: m.Month, Year: m.Year, IsActual: (m.Month < date.getMonth()), MonthName: this.monthListMap.get(m.Month), SeasonWeight: m.SeasonWeight, AVGDisc: m.AvgDisc,TotalSharedVal:0,MonthFSales:m.MonthFSales });

          });
          this.cols = 5 + this.months.length;
          this.table1Width = this.cols * 150;
       
      }
    });


  }


  onSubmit() {

    this.service
      .SaveNewSalesPlan(this.plan)
      .subscribe(res => {
        console.log("SaveNewSalesPlan", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.plan.BPlanID = res.Item;
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }

  bpVolumChanged(genderIndex, linendex) {
    const line = this.planItems[genderIndex].Childs[linendex];
      line.Childs.forEach(desc => {
          for (var monthIndex = 0; monthIndex < desc.Months.length; monthIndex++) {
            var itemMonth = desc.Months[monthIndex];
            itemMonth.Value = Number(itemMonth.Volum) * ((100 - Number(itemMonth.AVGDisc)) * Number(desc.AUP) / 100);
           // itemMonth.ValueShare = itemMonth.Value;
            //itemMonth.LineWeigth = itemMonth.ValueShare * 100 / line.TotalValue;

          }
      });

      line.TotalVolum = 0;
      line.TotalVal = 0;
      line.Childs.forEach(desc => {

        for (var monthIndex = 0; monthIndex < desc.Months.length; monthIndex++) {
          var itemMonth = desc.Months[monthIndex];
          line.TotalVolum += Number(itemMonth.Volum);
          line.TotalVal += Number(itemMonth.Value);
        }
        });


      this.planItems[genderIndex].TotalVolum = this.planItems[genderIndex].Childs.map(l => l.TotalVolum).reduce((x,y) =>{return Number(x)+Number(y);});
      this.planItems[genderIndex].TotalValue = this.planItems[genderIndex].Childs.map(l => l.TotalValue).reduce((x,y) =>{return Number(x)+Number(y);});
      this.planItems[genderIndex].TotalVal = this.planItems[genderIndex].Childs.map(l => l.TotalVal).reduce((x,y) =>{return Number(x)+Number(y);});
  }

  bpLineWeigthChanged(genderIndex, linendex) {
    const line = this.planItems[genderIndex].Childs[linendex];
      line.Childs.forEach(desc => {
          for (var monthIndex = 0; monthIndex < desc.Months.length; monthIndex++) {
            var itemMonth = desc.Months[monthIndex];
            itemMonth.ValueShare = Number(line.TotalValue) * Number(itemMonth.LineWeigth) / 100;
            itemMonth.Volum = Math.round(Number(itemMonth.ValueShare) / ((100 - Number(itemMonth.AVGDisc)) * Number(desc.AUP) / 100));
            itemMonth.Value = Number(itemMonth.Volum) * ((100 - Number(itemMonth.AVGDisc)) * Number(desc.AUP) / 100);
          }
      });

      line.TotalVolum = 0;
      line.TotalValue = 0;
      line.TotalVal = 0;
      line.Childs.forEach(desc => {

        for (var monthIndex = 0; monthIndex < desc.Months.length; monthIndex++) {
          var itemMonth = desc.Months[monthIndex];
          line.TotalVolum += Number(itemMonth.Volum);
          line.TotalVal += Number(itemMonth.Value);
          line.TotalValue += Number(itemMonth.ValueShare);
        }
        });

      this.planItems[genderIndex].TotalVolum = this.planItems[genderIndex].Childs.map(l => l.TotalVolum).reduce((x,y) =>{return Number(x) + Number(y);});
      this.planItems[genderIndex].TotalValue = this.planItems[genderIndex].Childs.map(l => l.TotalValue).reduce((x,y) =>{return Number(x) + Number(y);});
      this.planItems[genderIndex].TotalVal = this.planItems[genderIndex].Childs.map(l => l.TotalVal).reduce((x,y) =>{return Number(x) + Number(y);});

  }


  ngOnInit() {
  }

  selectBranch(event) {
    this.criteria.BranchId = event.Id;
    this.branch = event.Name;
    if (this.criteria.SeasonID)
      this.enableGet = true;
    // this.validateForm();
  }

  selectSeason(event) {
    //  debugger;
   // console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.isWinter = event.SeasonType.ID === 2;
    this.season = event.Name;
    if (this.criteria.BranchId)
    this.enableGet = true;
    // this.validateForm();
  }

  validateForm() {
    if (this.criteria.BranchId &&
      this.criteria.SeasonID &&
      this.criteria.TotalPlannedQuantity) {
      this.enableGet = true;
    } else {
      this.enableGet = false;
    }
  }

  colOnLoad() {
    debugger;
    // console.log(e);
  }

  handleLoad(e) {
    debugger;
    console.log(e)
  }

  trackByFn(index, instructor) {
    console.log(instructor, new Date().getUTCMilliseconds());
    return index+'-'+new Date().getUTCMilliseconds();
  }

  getMonth(month, year){
    return this.monthListMap.get(month)+`-${year}`;
  }
  exportAsXLSX(){
    debugger;
    this.exportAsExcelFile(document.getElementById("resulttable"),"SalesMonths");
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
