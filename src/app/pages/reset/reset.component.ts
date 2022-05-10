import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../helpers/mustmatch.helper';
import { AuthService } from '@ludo/core/auth/auth.service';
import { Toaster } from '@ludo/helpers/toast.helper';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,

    private _toaster: Toaster,
    private _auth: AuthService,) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          oldpassword: ['', [Validators.required, Validators.minLength(7),Validators.maxLength(16)]],
          confirmPassword: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(7),Validators.maxLength(16)]],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustMatch('password', 'confirmPassword')
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
      var data :any={};
      data.email = this.registerForm.value.email;
      data.old = this.registerForm.value.oldpassword;
      data.new = this.registerForm.value.password;

      this._auth.reset(data).subscribe(
        res => {
          var result:any = res;
          this._toaster.success('Success!',` Password Reset : ` + result.data);
          this.submitted = false;
          this.registerForm.reset();
        },
        err => { this._toaster.error('Failure!',` Issue: ` + err.error.error);  },
        () => console.log('HTTP request completed.')
      );

    }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
