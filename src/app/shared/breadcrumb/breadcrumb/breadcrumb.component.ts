import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import { LogService } from "@ludo/core/log/log.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  menuItems:any;

  constructor(
    private _router:Router,
    private _route:ActivatedRoute
  ) { }

  ngOnInit() {
    LogService.Log(this._router.events);
  }

}
