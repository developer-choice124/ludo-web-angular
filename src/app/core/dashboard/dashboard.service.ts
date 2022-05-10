import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "@env/environment";
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  
  private _getBaseUrl = env.setBaseUrl + 'api/v1/';

  constructor(
    private _http: HttpClient,
  ) { }


  getHeaders(){
    var token = 'JWT ' + JSON.parse(localStorage.getItem('user')).token.toString();
    var httpOptions:any;
    return httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ApiSecret': 'LudoTechphantAppSecret',
        'Authorization': token
      })
    };
  }

  async getRoomList() {
      // var Url_link = env.setBaseUrl + 'colyseus'+ '/api';
      var Url_link = env.setBaseUrl + 'colyseus' + env.apiSuperSecreat + '/api';
      return await this._http.get(Url_link, this.getHeaders());
  }

  postRedeemUpdateCoins(data) {
    var Url_link = this._getBaseUrl + 'update-repay-payment-amount-list';
    return this._http.post(Url_link, data, this.getHeaders());
  }

  
  _GetRoomDetails(params:string){
    var Url_link = this._getBaseUrl + 'room-details/' + params;
    return this._http.get(Url_link, this.getHeaders());
  }

  
  _GetRedeemDetails(params:string){
    var Url_link = this._getBaseUrl + 'get-repay-payment-amount-list/' + params;
    return this._http.get(Url_link, this.getHeaders());
  }

  _GetAppUpdateDetails(params:string){
    var Url_link = this._getBaseUrl + 'get-app-update-list/' + params;
    return this._http.get(Url_link, this.getHeaders());
  }


  _GetReferDetails(params:string){
    var Url_link = this._getBaseUrl + 'share-repay-by-coin-request-list/' + params;
    return this._http.get(Url_link, this.getHeaders());
  }

  async getRoomDetails(roomId){    
    var Url_link = env.setBaseUrl + 'colyseus' + env.apiSuperSecreat + '/api/room?roomId=' + roomId;
    return await this._http.get(Url_link);
  }



  async remoteRoomCall(roomId:string, method:string, args:any) {
    var Url_link = env.setBaseUrl + 'colyseus' + env.apiSuperSecreat + '/api/room/call?roomId=' + roomId + '&method='+ method + '&args=' + args;
    return await this._http.get(Url_link);
  }

}
