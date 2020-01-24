import {FigureViewComponent} from './figure.view.component';
import {NgModule} from "@angular/core";
import {DataTableModule} from 'primeng/primeng';
import {NgaModule} from "../../theme/nga.module";
import {CommonModule} from "@angular/common";
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { FigureViewService } from './figure.view.service';
import { routing } from "./figure.view.routing";
import { BranchesModule } from '../Lookups/Branches/branches.module';


@NgModule({
  imports: [
    DataTableModule,
    CommonModule,
    AngularFormsModule,
    NgaModule,
    BranchesModule,
    routing
  ],
  declarations: [],
  exports: [],
  providers: [FigureViewService]
})
export class FigureViewModule {
}
