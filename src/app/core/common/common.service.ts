import { Injectable } from '@angular/core';
import { environment as env } from "@env/environment";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

const user = JSON.parse(localStorage.getItem('user'));

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    })
  };

  constructor(
    private _http:HttpClient
  ) { }

  getReportType(){
    const url = `${env.baseUrl}public/story-report-types/A`;
    return this._http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getLanguages(){
    const url = `${env.baseUrl}public/get-language`;
    return this._http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getTags(){
    const url = `${env.baseUrl}public/get-tags`;
    return this._http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCharacters(){
    const url = `${env.baseUrl}public/get-characters`;
    return this._http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getBackgrounds(){
    const url = `${env.baseUrl}public/get-backgrounds`;
    return this._http.get(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
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

}
