import { Routes, RouterModule } from '@angular/router';
import { BPPurchaseRequestComponent } from "./BP-Purchase-Request/BPPurchaseRequest.component";
import { SearchBPPurchaseRequestComponent } from "./search-BP-Purchase-Request/search-BP-Purchase-Request.component";

const routes: Routes = [
    { path: 'searchBPPurchaseRequest', component: SearchBPPurchaseRequestComponent },
    { path: 'bpPurchaseRequest', component: BPPurchaseRequestComponent },
    { path: 'bpPurchaseRequest/edit/:id', component: BPPurchaseRequestComponent},
    { path: 'bpPurchaseRequest/view/:id', component: BPPurchaseRequestComponent}
];

export const routing = RouterModule.forChild(routes);
