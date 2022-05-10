import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { navItems } from './_nav';
@Component({
  selector: 'app-sidebar-old',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  public sidebarMinimized = false;
  public navItems = navItems;
  public appSidebar:any;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    // this.appSidebar.minimized = true;
  }

}
