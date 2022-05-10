import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class Toaster {

    public config:object = {
        timeOut:2000
    };

    constructor(
        private _toast: ToastrService
    ){}

    success(title:string, message:string){
        this._toast.success(message, title, this.config);
    }
    warning(title:string, message:string){
        this._toast.warning(message, title, this.config);
    }
    error(title:string, message:string){
        this._toast.error(message, title, this.config);
    }
    info(title:string, message:string){
        this._toast.info(message, title, this.config);
    }

}
