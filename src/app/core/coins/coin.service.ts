import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "@env/environment";
import { AuthService } from '../auth/auth.service';

const BaseUrl = env.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(
    private _authService: AuthService,
    private _http: HttpClient,
  ) { }



}
