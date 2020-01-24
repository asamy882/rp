import { Component, OnInit } from '@angular/core';
import { LookupComponent } from '../Lookup/lookup.component';
@Component({
  selector: 'app-costing',
  templateUrl: './costing.lookup.component.html',
  styleUrls: ['./costing.lookup.component.css']
})
export class costingLookupComponent extends LookupComponent implements OnInit {

  ngOnInit() {
    this.saveInLocalStorage = false;
    this.lookupName = '';
    this.lookupUrl = 'costing/Getcostingsforpricing';
    this.colDefinition = [{ field: 'CostingId', header: 'Costing Id' },
    { field: 'CostingName', header: 'Name' },
    { field: 'CostingDate', header: 'Costing Date' }
    ];
    super.ngOnInit();
   /* this.applicationService.observableGet<any>(this.lookupUrl).subscribe(res => {
      this.items = res.Items;
     });*/
  }

}
