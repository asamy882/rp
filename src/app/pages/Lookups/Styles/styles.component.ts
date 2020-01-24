import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {LookupComponent} from '../Lookup/lookup.component';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.lookupName = 'Styles';
    this.lookupUrl = 'StyleDefinition/GetAll';
    this.colDefinition = [{field: 'StyleNumber', header: 'StyleNumber'},
      {field: 'StyleNumber', header: 'Item Code'},
      {field: 'ItemName', header: 'Item Name'},
      {field: 'ItemCode', header: 'Style Number'},
      {field: 'ItemGroup1.Name', header: 'Gender'},
      {field: 'ItemGroup2.Name', header: 'Line'},
      {field: 'ItemGroup3.Name', header: 'Description'},
      {field: 'ItemGroup4.Name', header: 'Shipment No'},
      {field: 'ItemGroup5.Name', header: 'Season'}
    ];
    super.ngOnInit();
  }

}
