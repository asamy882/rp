import { Component, EventEmitter, Input, Output, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/primeng';
import { OPEXPlanService } from './opex-plan.service';
import { OPEXPlanCriteria } from './opex-plan.criteria';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: "NgOPEXPlan",
  templateUrl: "./opex-plan.component.html",
  styleUrls: ["./opex-plan.component.css"]
})
export class OPEXPlanComponent implements OnInit {

  planItems: any[] = [];
  plan: any;
  criteria: OPEXPlanCriteria = new OPEXPlanCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  CostCenter: string;
  months: string[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];

  constructor(private service: OPEXPlanService) {
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





  getOPEXPlan() {

    this.service.getOPEXPlan(this.criteria).subscribe(res => {
      console.log('getOPEXPlan - res', res);
      if (res.Success) {
        //   debugger;
        this.enableGet = false;
        this.enableSave = false;
        this.plan = res.Item;
        this.planItems = res.Item.Items;
        this.viewResult = true;
        this.criteria.PlanId = this.plan.PlanId;
        res.Item.Items[0].ItemMonths.forEach(m => {
          this.months.push(this.monthListMap.get(m.PlanMonth));
        });

      }
    });


  }


  onSubmit() {
    this.plan.Deparment = this.criteria.Deparment;
    this.service
      .SaveOPEXPlan(this.plan)
      .subscribe(res => {
        console.log("SaveOPEXPlan", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }


  ngOnInit() {
  }

  calculateTotalBudget(index) {
    let item = this.planItems[index];
    item.TotalBudget = 0.0;
    item.ItemMonths.forEach(m => {
      item.TotalBudget = +item.TotalBudget + +m.TotalAmount;
    });
    this.enableSave = true;
  }

  selectCostCenter(event) {
    this.criteria.CostCenterId = event.Id;
    this.CostCenter = event.Name;
    this.validateForm();
  }

  selectDeparment(event) {
    //  debugger;
    //  console.log('selectDeparment', event);
    this.criteria.Deparment = event;
    this.validateForm();
  }

  validateForm() {
    if (this.criteria.CostCenterId &&
      this.criteria.Deparment.Id &&
      this.criteria.PlanYear) {
      this.enableGet = true;
    } else {
      this.enableGet = false;
    }
  }
  exportAsXLSX(){
    this.exportAsExcelFile(document.getElementById("resulttable"),"OPEXPLAN");
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
