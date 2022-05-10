import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "@ludo/core/auth/auth.service";
import { User } from "@ludo/models";
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.onResize();
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onResize() {
    var screensize = document.documentElement.clientHeight;
    $('#styapp').css("height", screensize);
    document.getElementById("styapp").style.height = screensize.toString();
  }

  onLogin(){
    let body = this.loginForm.value;
    body.user_type = 1;
    this._auth.login(body);
  }

}
