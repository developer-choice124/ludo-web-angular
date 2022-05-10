import { Component, OnInit } from '@angular/core';
import { AuthService } from '@ludo/core/auth/auth.service';

@Component({
  selector: 'app-logout',
  template: 'hello',
})
export class LogoutComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.logout();
  }
    logout(){
      this._auth.logout();
    }


}
