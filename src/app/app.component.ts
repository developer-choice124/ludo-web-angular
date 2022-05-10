import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "@ludo/core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  isLoggedIn$:Observable<boolean>;

  constructor(
    private _auth:AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
