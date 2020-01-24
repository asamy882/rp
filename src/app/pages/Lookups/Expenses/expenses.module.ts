import {NgModule} from "@angular/core";
import {ExpensesComponent} from "./expenses.component";
import {CommonModule} from "@angular/common";
import {DialogModule, DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [DialogModule, DataTableModule, CommonModule],
  exports: [ExpensesComponent],
  declarations: [ExpensesComponent],
  providers: [],
})
export class ExpensesModule {
}
