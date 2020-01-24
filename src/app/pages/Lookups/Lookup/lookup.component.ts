import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';

import {ApplicationService} from '../../AppCommon/application.service';


@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  @Output() selectedRowListener: EventEmitter<any> = new EventEmitter<any>();
  @Input() lookupName: string;
  @Input() lookupUrl: string;
  @Input() colDefinition: any;
  @Input() saveInLocalStorage: boolean = true;
  _modal: boolean = false;
  _height: number = 750;
  _width: number = 900;
  display: boolean = false;
  items: any;
  selectedItem: any;

  constructor(protected applicationService: ApplicationService) {
  }

  ngOnInit() {
    //  console.log('LookupComponent -- ngOnInit');
    //   debugger;
    var value = null;
    if (this.saveInLocalStorage)
      value = this.applicationService.loadObjectFromLocalStorage(this.lookupName);
    // console.log('value', value);
    //  debugger;
    if (value != null)
      this.items = JSON.parse(value);
    if (!this.items) {
      this.applicationService.observableGet<any>(this.lookupUrl).subscribe(res => {
        //console.log(this.lookupUrl,res);
        this.items = res.Items;
        if (this.saveInLocalStorage)
          this.applicationService.saveObjectOnLocalStorage(this.lookupName, JSON.stringify(this.items));
      });
    }
    ;
  }

  onRowSelect(event) {
    this.selectedRowListener.emit(this.selectedItem);
    this.hideDialog();

  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

}
