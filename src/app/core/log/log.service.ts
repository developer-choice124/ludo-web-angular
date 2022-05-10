import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

    static Log(body:any=''){
        console.log(body);

    }

    static Error(body:any=''){
        console.error(body);

    }

}
