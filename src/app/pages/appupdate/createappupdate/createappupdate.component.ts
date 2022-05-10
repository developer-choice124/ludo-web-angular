import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { AuthService } from '@ludo/core/auth/auth.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { MustMatch } from '@ludo/helpers/mustmatch.helper';
import { BuycoinsService } from '@ludo/core/buycoins/buycoins.service';
import { MatDatepickerModule, MatMomentDateModule, MatNativeDateModule } from '@coachcare/datepicker';
@Component({
  selector: 'app-createappupdate',
  templateUrl: './createappupdate.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./createappupdate.component.scss']
})
export class CreateappupdateComponent implements OnInit {

  updateForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private _toaster: Toaster,
    private _buyService: BuycoinsService,
    private _auth: AuthService, ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      version: ['', Validators.required],
      version_type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      link: ['', Validators.required],
      whatsnew: ['', Validators.required],
      type: [false]
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPress2(event: any) {
    const pattern =/^\d*\.?\d*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateForm.value, null, 4));
    var data: any = {};
    // var datax= JSON.stringify(this.updateForm.value);
    data.email= this.updateForm.value.email;
    data.link= this.updateForm.value.link;
    data.type= this.updateForm.value.type;
    data.version= this.updateForm.value.version;
    data.version_type= this.updateForm.value.version_type;
    data.whatsnew= this.updateForm.value.whatsnew;
    console.log(data);
    this._buyService.appUpdate(data).subscribe(
      res => {
        var result: any = res;
        console.log(result.data);
        this._toaster.success('Success!', ` Coins has been added !!`);
        this.submitted = false;
        this.updateForm.reset();
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => console.log('HTTP request completed.')
    );

  }

  onReset() {
    this.submitted = false;
    this.updateForm.reset();
  }
}

