import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchCriteria } from './search.criteria';
import { ReportService } from './report.service';

@Component({
  selector: "NgReport",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent {
  @Input()
  rowData: any[] = [];
  @Input()
  colDefinition: any [] = [];
  @Input()
  url: string;
  criteria: SearchCriteria = new SearchCriteria();
  isFilter: boolean;



  constructor(private reportService: ReportService) {
  }

  search() {
    this.reportService.search(this.url, this.criteria).subscribe(res =>{
      console.log('search - res',res);
      if(true || res.Success){
        this.rowData = res.Item;
       /* res.Item.forEach(element => {
          this.rowData.push(element);
        });*/
        if(this.colDefinition.length == 0){
          if(this.rowData.length > 0){
            for(var key in this.rowData[0])
              {
                this.colDefinition.push({ 'field': key, 'header': key });
              }
          }
        }
      }
    });

  }

  filterClicked() {
    (this.isFilter) ? this.isFilter = false : this.isFilter = true;
  }

}
