import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovingSearchCriteria } from './moving.search.criteria';
import { MovingReportService } from './moving.report.service';

@Component({
  selector: "NgMovingReport",
  templateUrl: "./moving.report.component.html",
  styleUrls: ["./moving.report.component.css"]
})
export class MovingReportComponent {
  @Input()
  rowData: any[] = [];
 // @Input()
 // colDefinition: any [] = [];
  @Input()
  url: string = "Reports/GetFastMovingReport";
  criteria: MovingSearchCriteria = new MovingSearchCriteria();
  movingType: string = 'FM';



  constructor(private reportService: MovingReportService) {
  }

  movingTypes = [
    {label: 'Fast Moving', value: 'FM', icon: ''},
    {label: 'Slow Moving', value: 'SM', icon: ''}
];


  search() {
    if(this.movingType &&
    this.movingType == 'SM' ){
      this.url = "Reports/GetSlowMovingReport";
    }
    this.reportService.search(this.url, this.criteria).subscribe(res =>{
      console.log('search - res',res);
      if(res.Success){
        this.rowData = res.Item;
       /* res.Item.forEach(element => {
          this.rowData.push(element);
        });*/

        for(var key in this.rowData[0])
              {
                console.log(key);
              }
      }
    });

  }


  selectItemGroup1(item){
    this.criteria.GroupCode1 = item.Code;
    this.criteria.GroupName1 = item.Name;
  }

  selectItemGroup2(item){
    this.criteria.GroupCode2 = item.Code;
    this.criteria.GroupName2 = item.Name;
  }

  selectItemGroup3(item){
    this.criteria.GroupCode3 = item.Code;
    this.criteria.GroupName3 = item.Name;
  }

  selectItemGroup4(item){
    this.criteria.GroupCode4 = item.Code;
    this.criteria.GroupName4 = item.Name;
  }

  selectItemGroup5(item){
    this.criteria.GroupCode4 = item.Code;
    this.criteria.GroupName4 = item.Name;
  }

}
