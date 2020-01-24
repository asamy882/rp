import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { OTBService } from './otb.service';
import { OTBCriteria } from './otb.criteria';
import { Season } from '../Seasons/season.class';
import { WorkflowService } from '../components/workflow/workflow.service';
import { Task } from '../components/workflow/task';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "NgOTB",
  templateUrl: "./otb.component.html",
  styleUrls: ["./otb.component.css"]
})
export class OTBComponent implements OnInit {

  items: any[] = [];
  otb: any;
  criteria: OTBCriteria = new OTBCriteria();
  viewResult: boolean = false;
  enableGet: boolean = false;
  enableSave: boolean = false;
  enableSaveDraft: boolean = false;
  season: Season = new Season();
  months: string[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  cols: number;
  table1Width: number;
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];
  task: Task = new Task();
  taskId: number;
  viewMode: boolean = false;
  @ViewChild('tbody') businessPlanTable: any;

  constructor(private service: OTBService,
    private activatedRoute: ActivatedRoute,
    private workflowService: WorkflowService) {
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





  getOTB() {

    this.service.getOTB(this.criteria).subscribe(res => {
      console.log('getOTB - res', res);
      if (res.Success) {
        debugger;
        this.enableGet = false;

        this.months = [];
        this.otb = res.Item;
        if (this.otb.IsDraft) {
          this.enableSave = true;
          this.enableSaveDraft = true;
        }
        else {
          this.enableSave = false;
          this.enableSaveDraft = false;
        }
        this.items = res.Item.Items;
        this.viewResult = true;
        this.criteria.OTBID = this.otb.OTBID;
        res.Item.Months.forEach(m => {
          this.months.push(this.monthListMap.get(m));
        });
        this.cols = 26 + this.months.length;
        this.table1Width = this.cols * 150;
        res.Item.Items.forEach(item => {
          item.OTBItemMonths = [];
          this.months.forEach(m => { item.OTBItemMonths.push(0) });
          //debugger;
          item.Childs.forEach(i => {
            i.Childs.forEach(j => {
              j.Childs.forEach(k => {
                for (var index = 0; index < this.months.length; index++)
                  item.OTBItemMonths[index] += k.OTBItemMonths[index].Volum;
              }
              )
            })
          }

          )
        });
        //this.renderPlanHTML(this.items);
      }
    });


  }

  renderPlanHTML(businessPlanItems: any[]) {

    let tbodyContent = "";
    for (var index = 0; index < businessPlanItems.length; index++) {
      var gender = businessPlanItems[index];
      var genderMonths: any[] = [];
      tbodyContent += "<tr><td class='width150 scroll-sticky-col h33'>" + gender.Name + "</td>";
      for (var lineIndex = 0; lineIndex < gender.Childs.length; lineIndex++) {
        if (lineIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col h33'>&nbsp;</td>";
        var line = gender.Childs[lineIndex];
        tbodyContent += "<td class='width150 scroll-sticky-col h33'>" + line.Name + "</td>";
        for (var itemNameIndex = 0; itemNameIndex < line.Childs.length; itemNameIndex++) {
          if (itemNameIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col h33'>&nbsp;</td><td class='width150 scroll-sticky-col h33'>&nbsp;</td>";
          var itemName = line.Childs[itemNameIndex];
          tbodyContent += "<td class='width150 scroll-sticky-col h33'>" + itemName.Name + "</td>";
          for (var descriptionIndex = 0; descriptionIndex < itemName.Childs.length; descriptionIndex++) {
            if (descriptionIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col h33'>&nbsp;</td><td class='width150 scroll-sticky-col h33'>&nbsp;</td><td class='width150 scroll-sticky-col h33'>&nbsp;</td>";
            var description = itemName.Childs[descriptionIndex];
            tbodyContent += "<td class='width150 scroll-sticky-col h33'>" + description.Name + "</td>";
            tbodyContent += "<td class='width150'>" + description.LastYearOnHand + "</td>";
            tbodyContent += "<td class='width150'>" + description.LastYearPurchse + "</td>";
            tbodyContent += "<td class='width150'>" + description.FXAVG + "</td>";
            tbodyContent += "<td class='width150'>" + description.OpenStock + "</td>";
            for (var monthIndex = 0; monthIndex < description.OTBItemMonths.length; monthIndex++) {
              var itemMonth = description.OTBItemMonths[monthIndex];
              tbodyContent += "<td class='width150 with-border'>" + itemMonth.Volum + "</td>";
              genderMonths[monthIndex] = (genderMonths[monthIndex] == null ? 0 : genderMonths[monthIndex]) + itemMonth.Volum;
            }
            tbodyContent += "<td class='width150'>" + description.TotalSold + "</td>";
            tbodyContent += "<td class='width150'>" + description.SELLTHRU + "</td>";
            tbodyContent += "<td class='width150'>" + description.LastSeasonRemaining + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? description.LastSeasonRemaining : "") + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? "" : description.LastSeasonRemaining) + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? description.LastSeasonRemaining : "") + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? '' : description.LastSeasonRemaining) + "</td>";
            tbodyContent += "<td class='width150'>" + description.NextSeasonPurchased + "</td>";
            tbodyContent += "<td class='width150'>" + (description.NextSeasonPurchased + description.LastSeasonRemaining) + "</td>";
            tbodyContent += "<td class='width150'>" + description.NextSeasonExpSales + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? (description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales) : '') + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? '' : (description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales)) + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? (description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales) : '') + "</td>";
            tbodyContent += "<td class='width150'>" + (description.IsCarryover ? '' : (description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales)) + "</td>";
            tbodyContent += "<td class='width150'>" + (description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales) + "</td>";
            tbodyContent += "<td class='width150'>" + description.PlannedSales + "</td>";
            tbodyContent += "<td class='width150'>&nbsp;</td>";
            tbodyContent += "<td class='width150'>" + ((description.NextSeasonPurchased + description.LastSeasonRemaining - description.NextSeasonExpSales) - description.PlannedSales) + "</td>";

            tbodyContent += "<td class='width100'><input type='text' class='width100' id='otb" + description.Id
              + "' name='otb" + description.Id + "' onchange='{window.OTBComponent.otbQtyChanged(\"" + description.Id + "\");}' value='" + description.OTBQTY + "'/></td>";

          }
        }
      }
      tbodyContent += "</tr>" +
        "<tr><td colspan='4' class='scroll-sticky-col-total'>Total " + gender.Name + "</td>" +
        "<td class='total-td'>" + gender.LastYearOnHand + "</td>" +
        "<td class='total-td'>" + gender.LastYearPurchse + "</td>";
      tbodyContent += "<td class='total-td''></td>";
      tbodyContent += "<td class='total-td''>" + gender.OpenStock + "</td>";

      for (var monthIndex = 0; monthIndex < genderMonths.length; monthIndex++) {
        tbodyContent += "<td class='total-td'>" + genderMonths[monthIndex] + "</td>";
      }
      tbodyContent += "<td class='total-td'>" + gender.TotalSold + "</td>";
      tbodyContent += "<td class='total-td'>&nbsp;</td>";
      tbodyContent += "<td class='total-td'>" + gender.LastSeasonRemaining + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? gender.LastSeasonRemaining : '') + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? '' : gender.LastSeasonRemaining) + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? gender.LastSeasonRemaining : '') + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? '' : gender.LastSeasonRemaining) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.NextSeasonPurchased + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.NextSeasonPurchased + gender.LastSeasonRemaining) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.NextSeasonExpSales + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? (gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales) : '') + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? '' : (gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales)) + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? (gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales) : '') + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.IsCarryover ? '' : (gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales)) + "</td>";
      tbodyContent += "<td class='total-td'>" + (gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.PlannedSales + "</td>";
      tbodyContent += "<td class='total-td'>&nbsp;</td>";
      tbodyContent += "<td class='total-td'>" + ((gender.NextSeasonPurchased + gender.LastSeasonRemaining - gender.NextSeasonExpSales) - gender.PlannedSales) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.OTBQTY + "</td>";
      tbodyContent += "</tr>";
    }
    debugger;
    this.businessPlanTable.nativeElement.insertAdjacentHTML('beforeend', tbodyContent);

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
              this.items = res.Item.Items;
              this.viewResult = true;
              this.criteria.SeasonID = this.otb.SeasonID;
              res.Item.Months.forEach(m => {
                this.months.push(this.monthListMap.get(m));
              });
              this.cols = 26 + this.months.length;
              this.table1Width = this.cols * 150;
              res.Item.Items.forEach(item => {
                item.OTBItemMonths = [];
                this.months.forEach(m => { item.OTBItemMonths.push(0) });
                //debugger;
                item.Childs.forEach(i => {
                  i.Childs.forEach(j => {
                    j.Childs.forEach(k => {
                      for (var index = 0; index < this.months.length; index++)
                        item.OTBItemMonths[index] += k.OTBItemMonths[index].Volum;
                    }
                    )
                  })
                }

                )
              });
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

}
