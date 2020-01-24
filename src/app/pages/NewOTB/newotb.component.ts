import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { NewOTBService } from './newotb.service';
import { OTBCriteria } from './newotb.criteria';
import { Season } from '../Seasons/season.class';
import { WorkflowService } from '../components/workflow/workflow.service';
import { Task } from '../components/workflow/task';
import { ActivatedRoute } from "@angular/router";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';



@Component({
  selector: "NgOTB",
  templateUrl: "./newotb.component.html",
  styleUrls: ["./newotb.component.css"]
})
export class NewOTBComponent implements OnInit {

  otb: any;
  criteria: OTBCriteria = new OTBCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  enableSaveDraft: boolean = false;
  season: Season = new Season();
  msgs: Message[] = [];
  task: Task = new Task();
  taskId: number;
  totalOTB: number;
  totalValue: number;
  viewMode: boolean = false;
  @ViewChild('tbody') businessPlanTable: any;

  constructor(private service: NewOTBService,
    private activatedRoute: ActivatedRoute,
    private workflowService: WorkflowService) {

  }

  getOTB() {
    this.service.getOTB(this.criteria).subscribe(res => {
      if (res.Success) {

        this.enableGet = false;
        this.otb = res.Item;
        this.totalOTB = 0;
        this.totalValue = 0;
        if (this.otb.IsDraft) {
          this.enableSave = true;
          this.enableSaveDraft = true;
        }
        else {
          this.enableSave = false;
          this.enableSaveDraft = false;
        }
        this.viewResult = true;
        this.criteria.OTBID = this.otb.OTBID;
        this.otb.Items.forEach(gender => {
          gender.Value = 0;
          gender.Childs.forEach(description => {
            gender.Value += description.OTB * description.AUP;
          });
          this.totalOTB+=gender.OTB;
          this.totalValue+=gender.Value;
        });
      }
    });


  }

  onSubmit() {
    this.service
      .SaveOTB(this.otb)
      .subscribe(res => {
        console.log("SaveOTB", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The OTB saved and submitted successfully' });

        }
      });
  }
  onSaveAsDraft() {
    this.service
      .SaveOTBAsDraft(this.otb)
      .subscribe(res => {
        console.log("SaveOTBAsDraft", res);
        this.enableGet = false;
        this.enableSave = false;
        if (res.Success) {
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The OTB saved successfully' });

        }
      });
  }


  ngOnInit() {
    this.taskId = this.activatedRoute.snapshot.params["taskId"];
    if (this.taskId != null) {
      this.viewMode = true;
      this.workflowService.getTaskById(this.taskId).subscribe(r => {
        if (r.Success) {
          this.task = r.Item;
          this.criteria.OTBID = this.task.TransactionId;
          this.service.getOTB(this.criteria).subscribe(res => {
            console.log('getOTB - res', res);
            if (res.Success) {
              //   debugger;
              this.otb = res.Item;

              this.viewResult = true;
              this.criteria.SeasonID = this.otb.SeasonID;
            }
          });
        }
      });

    }
  }



  selectSeason(event) {
    console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event;
    this.enableGet = true;

  }

  validateForm() {

  }

  exportAsXLSX() {

    this.exportAsExcelFile(document.getElementById("resulttable"), "FigureView");
  }
  public exportAsExcelFile(table: HTMLElement, excelFileName: string): void {
    var config = { raw: true, type: 'base64', cellStyles: true }
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, config);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //  var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    //  var url = window.URL.createObjectURL(blob);
    //  window.open(url);
  }

  otbAmountChanged(genderIndex) {
    this.otb.Items[genderIndex].Value = 0;
    this.otb.Items[genderIndex].OTB = 0;
    this.otb.Items[genderIndex].Childs.forEach(description => {
      this.otb.Items[genderIndex].OTB += parseInt(description.OTB);
      this.otb.Items[genderIndex].Value += description.OTB * description.AUP;
    });
    this.totalOTB = 0;
    this.totalValue = 0;
    this.otb.Items.forEach(gender => {   
      this.totalOTB+=gender.OTB;
      this.totalValue+=gender.Value;
    });
  }

}
