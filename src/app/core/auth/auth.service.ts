import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";

import { User } from "@ludo/models";
import { environment as env } from "@env/environment";

import { Toaster } from "@ludo/helpers/toast.helper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('user')));
  private loginUrl = env.baseUrl + 'login-web';
  private resetUrl = env.baseUrl + 'resetpassword-web';

  constructor(
    private router: Router,
    private _http: HttpClient,
    private _toast: Toaster
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(body: object) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ApiSecret': 'LudoTechphantAppSecret'
      })
    };

    this._http.post<User>(this.loginUrl, body, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe(
      (user: User) => {
        if (user.token) {
          this._toast.success('Success!', 'Welcome to Ludo Admin Panel!');
          localStorage.setItem('user', JSON.stringify(user));
          console.clear();
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      },
      error => {
        this._toast.warning('Warning!', error.msg);
      }
    );
    // this.loggedIn.next(true);
    // this.router.navigate(['/']);
  }


  reset(body: object) {

    var token = 'JWT '+ JSON.parse(localStorage.getItem('user')).token.toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ApiSecret': 'LudoTechphantAppSecret',
        'Authorization': token
      })
    };
    return this._http.post(this.resetUrl, body, httpOptions);

  }

  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred: ", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status} body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error);

  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
