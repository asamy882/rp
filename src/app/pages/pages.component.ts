import {Component, OnChanges} from '@angular/core';
import {Router, Routes} from '@angular/router';

import {BaMenuService} from '../theme';
import {PAGES_MENU} from './pages.menu';
import {ApplicationService} from "./AppCommon/application.service";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
    </footer>
    <ba-back-top position="200"></ba-back-top>
  `
})
export class Pages {
  MenuItems: any;
  constructor(private _menuService: BaMenuService, private router: Router, private appService: ApplicationService) {
    let userToken = localStorage.getItem("UserToken");
    if (userToken === null || userToken.length <= 0) {
      this.router.navigate(['/login']);
    }
    this.appService.observableGet('/Authentication/GetMenuItems').subscribe(
      (res: any) => {
    //    debugger;
   // console.log(res.Items);
        this.MenuItems = res.Items;
        this._menuService.updateMenuByRoutes(<Routes>this.MenuItems);
      }
    )
  }
}
