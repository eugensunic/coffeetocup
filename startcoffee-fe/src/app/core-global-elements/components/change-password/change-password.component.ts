import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { URL } from '../../../../environments/url';
import { getToken } from 'src/app/utils';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  @Input() showCurrentPasswordField = false;
  @Input() showChangePasswordField = false;
  @Input() changePasswordUrl = URL.resetPassword;
  passwordShow = [false, false, false];

  changeForm: FormGroup;
  submitted = false;
  currentSubmitted = false;
  resetMessage = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.changeForm = this.formBuilder.group(this.setValidators(), {
      validator: this.passwordMatch,
    });
  }

  get f() {
    return this.changeForm.controls;
  }

  onSubmit() {
    if (!this.showChangePasswordField) {
      return;
    }
    this.submitted = true;
    if (!this.isFormValid()) {
      return;
    }

    this.loginService
      .changePassword(this.changePasswordUrl, {
        token: getToken(window.location.href, 'change-password'),
        repeatPassword: this.f.repeatPassword.value,
      })
      .subscribe(
        (data) => {
          this.resetMessage = 'Your password has been successfully reset, you will need to login again !!';
          setTimeout(() => (window.location.href = '/'), 3000);
        },
        (err) => {
          this.resetMessage = 'Password reset failed';
        }
      );
  }

  setValidators(): any {
    return {
      currentPassword: ['', [Validators.required, Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(5)]],
    };
  }

  passwordMatch(AC: AbstractControl): any {
    const newPassword = AC.get('newPassword').value;
    const repeatPassword = AC.get('repeatPassword').value;
    if (newPassword !== repeatPassword) {
      AC.get('repeatPassword').setErrors({ match: true });
    } else {
      return null;
    }
  }

  checkCurrentPassword() {
    this.currentSubmitted = true;
    if (!this.f.currentPassword.valid) {
      return;
    }
    this.loginService
      .sendCurrentPassword(URL.settingsCheckCurrentPassword, {
        currentPassword: this.f.currentPassword.value,
      })
      .subscribe(
        (x) => {
          if (!x.passwordMatch) {
            this.changeForm.get('currentPassword').setErrors({ notMatch: true });
            return;
          }
          this.showChangePasswordField = x.passwordMatch;
        },
        (err) => {}
      );
  }

  toggleEyeSvgIcons(i) {
    const eyeSvgOpen = document.querySelector('.bi-eye') as HTMLElement;
    const eyeSvgClosed = document.querySelector('.bi-eye-slash') as HTMLElement;
    if (this.passwordShow[i]) {
      eyeSvgOpen.style.display = '';
      eyeSvgClosed.style.display = 'none';
    } else {
      eyeSvgOpen.style.display = 'none';
      eyeSvgClosed.style.display = '';
    }
  }

  handleOnPasswordToggle(index, inputId) {
    this.passwordShow[index] = !this.passwordShow[index];
    if (this.passwordShow[index]) {
      (document.getElementById(inputId) as HTMLInputElement).type = 'text';
      this.toggleEyeSvgIcons(index);
    } else {
      (document.getElementById(inputId) as HTMLInputElement).type = 'password';
      this.toggleEyeSvgIcons(index);
    }
  }
  // function call

  isFormValid(): boolean {
    return this.f.newPassword.valid && this.f.repeatPassword.valid;
  }
}
