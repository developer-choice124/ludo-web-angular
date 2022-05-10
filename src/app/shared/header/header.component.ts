import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from "@ludo/core/auth/auth.service";

@Component({
  selector: 'app-header-old',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn$:Observable<boolean>;
  navbarOpen = false;
  profileimage="../../../assets/images/Dice.jpg";
  email=""
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this._auth.isLoggedIn;
  }

  logout(){
    this._auth.logout();
  }
  navToggle(){
    this.navbarOpen = !this.navbarOpen;
  }

}
