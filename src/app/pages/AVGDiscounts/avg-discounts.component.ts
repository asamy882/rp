import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { AVGDiscountsService } from './avg-discounts.service';
import { AVGDiscountsCriteria } from './avg-discounts.criteria';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: "NgAVGDiscounts",
  templateUrl: "./avg-discounts.component.html",
  styleUrls: ["./avg-discounts.component.css"]
})
export class AVGDiscountsComponent implements OnInit {

  planItems: any[] = [];
  plan: any;
  criteria: AVGDiscountsCriteria = new AVGDiscountsCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  CostCenter: string;
  months: string[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];
  season: string;

  constructor(private service: AVGDiscountsService) {
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





  getAVGDiscounts() {
    this.criteria.BrandId = localStorage.getItem('BrandId');
    this.service.getAVGDiscounts(this.criteria).subscribe(res => {
      console.log('getAVGDiscounts - res', res);
      if (res.Success) {
        //   debugger;
        this.enableGet = false;
        this.enableSave = true;
        this.plan = res.Item;
        this.planItems = res.Item.Items;
        this.viewResult = true;
        this.months=[];
        res.Item.Months.forEach(m => {
          this.months.push(this.monthListMap.get(m.Month) + ' - ' +m.Year);
        });

      }
    });


  }


  onSubmit() {
    this.service
      .SaveAVGDiscounts(this.plan)
      .subscribe(res => {
        console.log("SaveAVGDiscounts", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }


  ngOnInit() {
  }

  selectSeason(event) {
    //  debugger;
    //  console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    this.enableGet = true;
  }
  exportAsXLSX(){
    debugger;
    this.exportAsExcelFile(document.getElementById("resulttable"),"AVGDiscount");
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
