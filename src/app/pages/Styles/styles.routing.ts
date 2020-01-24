import { Routes, RouterModule } from '@angular/router';
import { StyleComponent } from './Style/style.component';
import { UploadStyleFromExcelComponent } from './UploadStyleFromExcel/uploadstylefromexcel.component';

const routes: Routes = [
    { path: 'Upload', component: UploadStyleFromExcelComponent },
    { path: '', component: StyleComponent }
];

export const routing = RouterModule.forChild(routes);
