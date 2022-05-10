import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { AuthService } from '@ludo/core/auth/auth.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { MustMatch } from '@ludo/helpers/mustmatch.helper';
import { RoomcoinsService } from '@ludo/core/roomcoins/roomcoins.service';


@Component({
  selector: 'app-postroomcoins',
  templateUrl: './postroomcoins.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./postroomcoins.component.scss']
})
export class PostroomcoinsComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,

    private _toaster: Toaster,
    private _roomService: RoomcoinsService,
    private _auth: AuthService, ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      confirmcoin: ['', Validators.required],
      coin: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('coin', 'confirmcoin')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    var data: any = {};
    data.entrycoins = this.registerForm.value.coin;

    data.players = {
      "twoplayers": {
        "winningcoins": this.registerForm.value.coin,
        "totalcoins": this.registerForm.value.coin * 2,
      }, "threeplayers": {
        "winningcoins": this.registerForm.value.coin * 2,
        "totalcoins": this.registerForm.value.coin * 3,
      }, "fourplayers": {
        "winningcoins": this.registerForm.value.coin * 3,
        "totalcoins": this.registerForm.value.coin * 4,
      }
    };

    var datax = JSON.stringify(data);
    this._roomService.postRoomCoins(data).subscribe(
      res => {
        var result: any = res;
        this._toaster.success('Success!', ` Coins has been added !!`);
        this.submitted = false;
        this.registerForm.reset();
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => console.log('HTTP request completed.')
    );

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
