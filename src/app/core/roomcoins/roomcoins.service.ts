import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment as env } from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class RoomcoinsService {

  private _getBaseUrl = env.setBaseUrl + 'api/v1/';

  constructor(
    private _http: HttpClient,
  ) {

  }
  getHeaders(){
    var token = 'JWT ' + JSON.parse(localStorage.getItem('user')).token.toString();
    var httpOptions:any;
    return httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'ApiSecret': 'LudoTechphantAppSecret',
        'Authorization': token
      })
    };
  }

  async deleteRoomCoin(body: object) {

    var Url_link = this._getBaseUrl +  'delete-room-coin';
    return await this._http.post(Url_link, body, this.getHeaders());
  }
  getRoomCoins() {
    var Url_link = this._getBaseUrl + 'get-room-coin-list';
    return this._http.get(Url_link, this.getHeaders());
  }
  postRoomCoins(data) {
    var Url_link = this._getBaseUrl + 'post-room-coin-list';
    return this._http.post(Url_link, data, this.getHeaders());
  }
}
