import { Component, EventEmitter, Input, Output, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { Message, ConfirmationService } from 'primeng/primeng';
import { PurchaseBusinessPlanService } from './purchase-business-plan.service';
import { PurchaseBusinessPlanCriteria } from './purchase-business-plan.criteria';

import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../theme/services';

@Component({
  selector: "NgPurchaseBusinessPlan",
  templateUrl: "./purchase-business-plan.component.html",
  styleUrls: ["./purchase-business-plan.component.css"]
})
export class PurchaseBusinessPlanComponent implements OnInit {

  businessPlanItems: any[] = [];
  plan: any;
  criteria: PurchaseBusinessPlanCriteria = new PurchaseBusinessPlanCriteria();
  viewResult: boolean = false;
  viewMonths: boolean = false;
  enableCalculate: boolean = false;
  enableSave: boolean = false;
  branch: string;
  season: string;
  months: any[] = [];//['Mar','Apr','May','Jun','Jul','Aug'];
  cols: number;
  table1Width: number;
  monthListMap: Map<number, string> = new Map<number, string>();
  msgs: Message[] = [];
  @ViewChild('tbody') businessPlanTable: any;

  constructor(private service: PurchaseBusinessPlanService, private _imageLoader: BaImageLoaderService,
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

  calculate() {
debugger;
this.showLoading();
    this.criteria.months = [];
    this.months.forEach(m => {
      this.criteria.months.push({ Month: m.Month, AvgDisc: m.AVGDisc });
    });
    this.service.calculateBusinessPlan(this.criteria).subscribe(res => {
      console.log('calculate - res', res);
      if (res.Success) {
        this.months = [];
        this.enableCalculate = false;
        this.enableSave = true;
        this.plan = res.Item;
        this.businessPlanItems = res.Item.BusinessPlanItems;
        this.businessPlanItems.forEach(gender => {
          var genderMonths: any[] = [];
          for (var lineIndex = 0; lineIndex < gender.Childs.length; lineIndex++) {
            var line = gender.Childs[lineIndex];
            for (var itemNameIndex = 0; itemNameIndex < line.Childs.length; itemNameIndex++) {
              var itemName = line.Childs[itemNameIndex];
              for (var descriptionIndex = 0; descriptionIndex < itemName.Childs.length; descriptionIndex++) {
                var description = itemName.Childs[descriptionIndex];
                for (var monthIndex = 0; monthIndex < description.BusinessPlanItemMonths.length; monthIndex++) {
                  var itemMonth = description.BusinessPlanItemMonths[monthIndex];
                  if (genderMonths[monthIndex] == null) {
                    genderMonths[monthIndex] = { TotalActualVol: 0, TotalActualVal: 0, TotalBPVol: 0, TotalBPVal: 0 }
                  }
                  genderMonths[monthIndex].TotalActualVol += itemMonth.ActualVolum
                  genderMonths[monthIndex].TotalActualVal += itemMonth.ActualValue
                  genderMonths[monthIndex].TotalBPVol += itemMonth.Volum
                  genderMonths[monthIndex].TotalBPVal += itemMonth.Value
                }

              }
            }
          }
          gender.BusinessPlanItemMonths = genderMonths;
        });
        this.viewResult = true;
        let date = new Date();
        res.Item.Months.forEach(m => {
          this.months.push({ IsActual: (m.Month < date.getMonth()), MonthName: this.monthListMap.get(m.Month), Year: m.Year, SeasonWeight: m.SeasonWeight, AVGDisc: m.AvgDisc });
        });
        this.cols = 5 + this.months.length;
        this.table1Width = this.cols * 150;
        //this.renderPlanHTML(res.Item.BusinessPlanItems);
      }
    });
this.hideLoading();

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

  renderPlanHTML(businessPlanItems: any[]) {

    let tbodyContent = "";
    for (var index = 0; index < businessPlanItems.length; index++) {
      var gender = businessPlanItems[index];
      var genderMonths: any[] = [];
      tbodyContent += "<tr><td class='width150 scroll-sticky-col'>" + gender.Name + "</td>";
      for (var lineIndex = 0; lineIndex < gender.Childs.length; lineIndex++) {
        if (lineIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col'>&nbsp;</td>";
        var line = gender.Childs[lineIndex];
        tbodyContent += "<td class='width150 scroll-sticky-col'>" + line.Name + "</td>";
        for (var itemNameIndex = 0; itemNameIndex < line.Childs.length; itemNameIndex++) {
          if (itemNameIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col'>&nbsp;</td><td class='width150 scroll-sticky-col'>&nbsp;</td>";
          var itemName = line.Childs[itemNameIndex];
          tbodyContent += "<td class='width150 scroll-sticky-col'>" + itemName.Name + "</td>";
          for (var descriptionIndex = 0; descriptionIndex < itemName.Childs.length; descriptionIndex++) {
            if (descriptionIndex > 0) tbodyContent += "</tr><tr><td class='width150 scroll-sticky-col'>&nbsp;</td><td class='width150 scroll-sticky-col'>&nbsp;</td><td class='width150 scroll-sticky-col'>&nbsp;</td>";
            var description = itemName.Childs[descriptionIndex];
            tbodyContent += "<td class='width150 scroll-sticky-col'>" + description.Name + "</td>";
            tbodyContent += "<td class='width150 gray-bg'>" + description.SummerWeigth + "</td>";
            tbodyContent += "<td class='width150 orange-bg'>" + description.WinterWeigth + "</td>";
            tbodyContent += "<td class='width150 blue-bg'>" + description.AUP + "</td>";
            for (var monthIndex = 0; monthIndex < description.BusinessPlanItemMonths.length; monthIndex++) {
              var itemMonth = description.BusinessPlanItemMonths[monthIndex];
              tbodyContent += "<td class='width150 with-border'>" + itemMonth.ActualVolum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
              tbodyContent += "<td class='width150 with-border right-border-gray'>" + itemMonth.ActualValue.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
              tbodyContent += "<td class='width150 with-border'>" + itemMonth.Volum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
              tbodyContent += "<td class='width150 with-border right-border'>" + itemMonth.Value.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
              if (genderMonths[monthIndex] == null) {
                genderMonths[monthIndex] = { TotalAcyualVol: 0, TotalActualVal: 0, TotalBPVol: 0, TotalBPVal: 0 }
              }
              genderMonths[monthIndex].TotalAcyualVol += itemMonth.ActualVolum
              genderMonths[monthIndex].TotalActualVal += itemMonth.ActualValue
              genderMonths[monthIndex].TotalBPVol += itemMonth.Volum
              genderMonths[monthIndex].TotalBPVal += itemMonth.Value
            }
            tbodyContent += "<td class='total-td'>" + description.TotalActualVolum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
            tbodyContent += "<td class='total-td'>" + description.TotalActualValue.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
            tbodyContent += "<td class='total-td'>" + description.TotalVolum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
            tbodyContent += "<td class='total-td right-border'>" + description.TotalValue.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";

          }
        }
      }
      tbodyContent += "</tr><tr><td colspan='4' class='scroll-sticky-col-total'>Total " + gender.Name + "</td><td class='total-td'>" + gender.SummerWeigth + "</td><td class='total-td'>" +
        gender.WinterWeigth + "</td><td class='total-td'></td>";
      for (var monthIndex = 0; monthIndex < genderMonths.length; monthIndex++) {
        tbodyContent += "<td class='total-td'>" + genderMonths[monthIndex].TotalAcyualVol.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
        tbodyContent += "<td class='total-td'>" + genderMonths[monthIndex].TotalActualVal.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
        tbodyContent += "<td class='total-td'>" + genderMonths[monthIndex].TotalBPVol.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
        tbodyContent += "<td class='total-td right-border'>" + genderMonths[monthIndex].TotalBPVal.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
      }
      tbodyContent += "<td class='total-td'>" + gender.TotalActualVolum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.TotalActualValue.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
      tbodyContent += "<td class='total-td'>" + gender.TotalVolum.toLocaleString('en-us', { minimumFractionDigits: 0 }) + "</td>";
      tbodyContent += "<td class='total-td right-border'>" + gender.TotalValue.toLocaleString('en-us', { minimumFractionDigits: 2 }) + "</td>";
      tbodyContent += "</tr>";
    }

    this.businessPlanTable.nativeElement.innerHTML = tbodyContent;

  }



  findPurchaseBusinessPlan() {

    this.service.findPurchaseBusinessPlan(this.criteria).subscribe(res => {
      console.log('findPurchaseBusinessPlan - res', res);
      if (res.Success) {
        if (res.Item.BPlanID > 0) {
          this.enableCalculate = false;
          this.enableSave = false;
          this.plan = res.Item;
          this.businessPlanItems = res.Item.BusinessPlanItems;
          this.businessPlanItems.forEach(gender => {
            var genderMonths: any[] = [];
            for (var lineIndex = 0; lineIndex < gender.Childs.length; lineIndex++) {
              var line = gender.Childs[lineIndex];
              for (var itemNameIndex = 0; itemNameIndex < line.Childs.length; itemNameIndex++) {
                var itemName = line.Childs[itemNameIndex];
                for (var descriptionIndex = 0; descriptionIndex < itemName.Childs.length; descriptionIndex++) {
                  var description = itemName.Childs[descriptionIndex];
                  for (var monthIndex = 0; monthIndex < description.BusinessPlanItemMonths.length; monthIndex++) {
                    var itemMonth = description.BusinessPlanItemMonths[monthIndex];
                    if (genderMonths[monthIndex] == null) {
                      genderMonths[monthIndex] = { TotalActualVol: 0, TotalActualVal: 0, TotalBPVol: 0, TotalBPVal: 0 }
                    }
                    genderMonths[monthIndex].TotalActualVol += itemMonth.ActualVolum
                    genderMonths[monthIndex].TotalActualVal += itemMonth.ActualValue
                    genderMonths[monthIndex].TotalBPVol += itemMonth.Volum
                    genderMonths[monthIndex].TotalBPVal += itemMonth.Value
                  }

                }
              }
            }
            gender.BusinessPlanItemMonths = genderMonths;
          });
          this.viewResult = true;
          this.viewMonths = true;
          this.criteria.TotalPlannedQuantity = this.plan.TotalPlannedQuantity;
          this.criteria.BPlanID = this.plan.BPlanID;
          this.months = [];
          let date = new Date();
          res.Item.Months.forEach(m => {
            this.months.push({ Month: m.Month, Year: m.Year, IsActual: (m.Month < date.getMonth()), MonthName: this.monthListMap.get(m.Month), SeasonWeight: m.SeasonWeight, AVGDisc: m.AvgDisc });

          });
          this.cols = 5 + this.months.length;
          this.table1Width = this.cols * 150;
          //this.renderPlanHTML(res.Item.BusinessPlanItems);
        }
        else {
          this.plan = res.Item;
          this.months = [];
          res.Item.Months.forEach(m => {
            this.months.push({ Month: m.Month, Year: m.Year, IsActual: false, MonthName: this.monthListMap.get(m.Month), SeasonWeight: m.SeasonWeight, AVGDisc: m.AvgDisc });

          });
          this.viewMonths = true;
        }
      }
    });


  }


  onSubmit() {

    this.service
      .SavePurchaseBusinessPlan(this.plan)
      .subscribe(res => {
        console.log("SavePurchaseBusinessPlan", res);
        this.enableCalculate = false;
        this.enableSave = false;
        if (res.Success) {
          this.plan.BPlanID = res.Item.BPlanID;
          this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'The plan saved successfully' });

        }
      });
  }

  bpVolumChanged(genderIndex) {
    var genderMonths: any[] = [];
    let item = this.businessPlanItems[genderIndex].Childs.forEach(line => {
      line.Childs.forEach(itemName => {
        itemName.Childs.forEach(desc => {
          desc.TotalVolum = 0;
          for (var monthIndex = 0; monthIndex < desc.BusinessPlanItemMonths.length; monthIndex++) {
            var itemMonth = desc.BusinessPlanItemMonths[monthIndex];
            desc.TotalVolum += itemMonth.Volum;
            itemMonth.Value = itemMonth.Volum * (desc.AUP * ((100 - itemMonth.AvgDisc) / 100));
            desc.TotalValue += itemMonth.Value;
            if (genderMonths[monthIndex] == null) {
              genderMonths[monthIndex] = { TotalActualVol: 0, TotalActualVal: 0, TotalBPVol: 0, TotalBPVal: 0 }
            }
            genderMonths[monthIndex].TotalActualVol += itemMonth.ActualVolum
            genderMonths[monthIndex].TotalActualVal += itemMonth.ActualValue
            genderMonths[monthIndex].TotalBPVol += itemMonth.Volum
            genderMonths[monthIndex].TotalBPVal += itemMonth.Value
          }
        });
      });
    });
    item.BusinessPlanItemMonths = genderMonths;
  }

  ngOnInit() {
  }

  selectBranch(event) {
    this.criteria.BranchId = event.Id;
    this.branch = event.Name;
    if (this.criteria.SeasonID)
      this.findPurchaseBusinessPlan();
    // this.validateForm();
  }

  selectSeason(event) {
    //  debugger;
    //  console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    if (this.criteria.BranchId)
      this.findPurchaseBusinessPlan();
    // this.validateForm();
  }

  validateForm() {
    if (this.criteria.BranchId &&
      this.criteria.SeasonID &&
      this.criteria.TotalPlannedQuantity) {
      this.enableCalculate = true;
    } else {
      this.enableCalculate = false;
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


}
