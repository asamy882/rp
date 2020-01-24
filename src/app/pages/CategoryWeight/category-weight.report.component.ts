import { Component, EventEmitter, Input, ViewChild, AfterViewInit, AfterContentInit, Output, OnInit } from '@angular/core';
import { CategoryWeightReportService } from './category-weight.report.service';
import { CategoryWeight } from './category-weight';
import { CategoryWeightCriteria } from './category-weight.criteria';
import { Gender } from './gender';
import { Line } from './line';
import { Item } from './item';
import { ItemInfo } from './item-info';

@Component({
  selector: "NgCategoryWeightReport",
  templateUrl: "./category-weight.report.component.html",
  styleUrls: ["./category-weight.report.component.css"]
})
export class CategoryWeightReportComponent implements OnInit {

  reportResults: Gender[] = [];
  criteria: CategoryWeightCriteria = new CategoryWeightCriteria();
  viewResult: boolean = false;
  season: string;
  enableButton: boolean = false;
  @ViewChild('tbody') catContentBody: any;



  constructor(private service: CategoryWeightReportService) {
  }

  exportData () 
  {
    this.service.exportToExcel(this.criteria).subscribe(data => this.downloadFile(data)),//console.log(data),
    error => console.log("Error downloading the file."),
    () => console.info("OK");
  }
  selectSeason(event) {
    //  debugger;
    //  console.log('selectSeason', event);
    this.criteria.SeasonID = event.SeasonID;
    this.season = event.Name;
    this.validateForm();
  }
downloadFile(data: Response) {
  var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
  var url = window.URL.createObjectURL(blob);
  window.open(url);
}

validateForm(){
  if(  this.criteria.SeasonID){
    this.enableButton = true;
  } else{
    this.enableButton = false;
  }
}
  search() {
    this.service.getCategoriesWeight(this.criteria).subscribe(res => {
      console.log('search - res', res);
      if (true || res.Success) {
        this.reportResults = res.Items;
        this.viewResult = true;
        this.renderCategoryWeightHTML(this.reportResults);
      }
    });

  }

  renderCategoryWeightHTML(items: Gender[]) {
    debugger;
    let tbodyContent = "";
    for (var index = 0; index < items.length; index++) {
      var gender = items[index];
      var genderMonths: any[] = [];
      tbodyContent += "<tr><td class='width150' rowspan='" + gender.ItemsCount + "'>" + gender.Name + "</td>";
      for (var lineIndex = 0; lineIndex < gender.Childs.length; lineIndex++) {
        if (lineIndex > 0) tbodyContent += "</tr><tr>";
        var line = gender.Childs[lineIndex];
        tbodyContent += "<td class='width150' rowspan='" + line.ItemsCount + "'>" + line.Name + "</td>";
        for (var itemNameIndex = 0; itemNameIndex < line.Childs.length; itemNameIndex++) {
          if (itemNameIndex > 0) tbodyContent += "</tr><tr>";
          var itemName = line.Childs[itemNameIndex];
          tbodyContent += "<td class='width150' rowspan='" + itemName.ItemsCount + "'>" + itemName.Name + "</td>";
          for (var descriptionIndex = 0; descriptionIndex < itemName.Childs.length; descriptionIndex++) {
            if (descriptionIndex > 0) tbodyContent += "</tr><tr>";
            var description = itemName.Childs[descriptionIndex];
            tbodyContent += "<td class='width150'>" + description.Name + "</td>";
            tbodyContent += "<td class='width150 gray-bg'>" + description.SummerWeigth + "%</td>";
            tbodyContent += "<td class='width150 orange-bg'>" + description.WinterWeigth + "%</td>";

          }
        }
      }
      tbodyContent += "</tr><tr><td colspan='4'  class='total-td'>" + gender.Name + " Total</td><td class='total-td'>" + gender.SummerWeigth + "</td><td class='total-td'>" +
        gender.WinterWeigth + "</td>";
      tbodyContent += "</tr>";
    }
    this.catContentBody.nativeElement.innerHTML = tbodyContent;
  }


  ngOnInit() {


  }



}
