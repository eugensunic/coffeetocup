import { UserProfileService } from '../../user-profile/services/user-profile.service';
import { SharedService } from '../../shared/services/shared.service';
import { takeUntil } from 'rxjs/operators';
import { DateTimePickerService } from '../../shared/services/date-time-picker.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserSettingsService } from '../services/user-settings.service';
import { URL } from '../../../environments/url';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ModalChild } from '../../shared/components/ngbd-modal/ngbd-child.interface';
import { NgbdModalComponent } from '../../shared/components/ngbd-modal/ngbd-modal.component';
import { cookieObject, removeNavbarDropdown, isEmailValid } from '../../utils';
import { greenBorderColor } from 'src/environments/typography';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent implements OnInit, ModalChild, OnDestroy {
  private ngUnsubscribe = new Subject();
  @ViewChild('generalSettingsSm') generalSettingsSm;
  @ViewChild('changePasswordSm') changePasswordSm;
  @ViewChild('deleteAccountSm') deleteAccountSm;

  htmlNavbarItemsSm: HTMLElement[] = [];
  isProfileSaved = false;
  formErrorMessage = null;

  private readonly navbarSmColor = 'black';

  username;
  firstName;
  lastName;
  isSocialMedia = false;

  clicked = false;
  image = { stream: [] };
  insertImage = '';

  settings = {
    basic: false,
    changePassword: false,
    deleteAccount: false,
  };
  basicSettingsSaved = false;
  profileBasicData = { country: '', city: '', username: '', email: '', lastName: '', firstName: '' };

  // ngModel
  countryName = '';
  cityName = '';
  emailAddress = '';
  userName = '';
  passwordValue = '';

  name = 'Delete account';
  content = `Are you sure you want to delete the account?`;
  rightButtonName = 'YES';
  leftButtonName = 'NO';
  modalButtonColor = 'modal-button-delete-color';
  passwordShow = [false, false, false];

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private userSettingsService: UserSettingsService,
    private userProfileService: UserProfileService,
    private router: Router,
    private shared: SharedService
  ) {}

  // interface methods
  onConfirm() {
    this.userSettingsService
      .deleteAccount(URL.settingsDeleteAccount)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (_) => {
          window.location.href = '/';
        },
        (err) => {}
      );
  }

  onClose() {}

  ngOnInit() {
    setTimeout((_) => {
      this.htmlNavbarItemsSm = [this.generalSettingsSm, this.changePasswordSm, this.deleteAccountSm];
    });
    setTimeout((_) => this.openBasicSettings());
    // this.shared.setBackgroundImage('assets/images/general/profile_background.png');
    this.clicked = true;
    this.shared
      .getImage(URL.settingsProfileImage)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.insertImage = res;
        },
        (err) => {}
      );
    this.userProfileService
      .getUserSettingsData(URL.settingsBasic, {
        params: { otherUserId: undefined },
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.profileBasicData = x;
          this.emailAddress = x.email || '';
          this.countryName = x.country || '';
          this.cityName = x.city || '';
          this.userName = x.username || '';
          this.firstName = x.firstName || '';
          this.lastName = x.lastName || '';
          this.isSocialMedia = !x.email ? true : false;
        },
        (err) => {}
      );
  }

  // open particular settings area
  openBasicSettings() {
    removeNavbarDropdown();
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, greenBorderColor, null, null);

    this.setOpeningTab(true, false, false);
  }

  openChangePassword() {
    removeNavbarDropdown();
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, null, greenBorderColor, null);

    this.setOpeningTab(false, true, false);
  }

  openDeleteAccount() {
    removeNavbarDropdown();
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, null, null, greenBorderColor);

    this.setOpeningTab(false, false, true);
  }

  onFileChange(event: any) {
    this.userSettingsService.uploadProfileImage(URL.settingsProfileImage, event.target.files).subscribe(
      (y) => {
        if (y) {
          this.insertImage = y;
        }
      },
      (err) => {
        alert('Error occurred, try again or try another image');
      }
    );
  }

  deleteProfileImage() {
    if (!this.isDefaultImage()) {
      const modalRef = this.modalService.open(NgbdModalComponent);

      modalRef.componentInstance.name = 'Delete profile image';
      modalRef.componentInstance.content = `Your profile picture will be deleted permanently`;
      modalRef.componentInstance.rightButtonName = 'Delete';
      modalRef.componentInstance.onConfirm = () => {
        this.userSettingsService
          .deleteProfileImage(URL.settingsDeleteProfileImage)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(
            (res) => {
              this.insertImage = res;
            },
            (err) => {}
          );
      };
    } else {
      alert('Default image cannot be deleted');
    }
  }

  // click functions (http)
  onSaveBasicSettings() {
    if (!isEmailValid(this.emailAddress)) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'Email address is invalid';
      return;
    }
    if (this.isSocialMedia && (!this.passwordValue || this.passwordValue.length < 5)) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'Password must have a minimum of 5 characters';
      return;
    }
    if (!this.userName.trim()) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'Username cannot be empty';
      return;
    }
    if (!this.firstName.trim() || !this.lastName.trim()) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'First name and Last name cannot be empty';
      return;
    }
    if (!this.countryName.trim() || !this.cityName.trim()) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'Country name and City cannot be empty';
      return;
    }
    if (!this.isAtLeastOneInputFieldFilled()) {
      window.scrollTo(0, 0);
      setTimeout((_) => {
        this.formErrorMessage = null;
      }, 2500);
      this.formErrorMessage = 'You need to change at least one input field';
      return;
    }
    this.userSettingsService
      .sendBasicSettingsData(URL.settingsBasic, {
        email: this.emailAddress ? this.emailAddress.trim() : this.profileBasicData.email.trim(),
        isSocialMedia: this.isSocialMedia,
        password: this.passwordValue.trim(),
        country: this.countryName
          ? this.countryName.trim()
          : this.profileBasicData
          ? this.profileBasicData.country.trim()
          : null,
        city: this.cityName
          ? this.cityName.trim()
          : this.profileBasicData
          ? this.profileBasicData.city.trim()
          : null,
        username: this.userName
          ? this.userName.trim()
          : this.profileBasicData
          ? this.profileBasicData.username.trim()
          : null,
        firstName: this.firstName
          ? this.firstName.trim()
          : this.profileBasicData
          ? this.profileBasicData.firstName.trim()
          : null,
        lastName: this.lastName
          ? this.lastName.trim()
          : this.profileBasicData
          ? this.profileBasicData.lastName.trim()
          : null,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          if (x.message) {
            window.scrollTo(0, 0);
            setTimeout((_) => {
              this.formErrorMessage = null;
            }, 2500);
            this.formErrorMessage = x.message;
            return;
          }
          // if email changed logout user
          if (this.profileBasicData.email !== this.emailAddress) {
            this.loginService.logout().then((_) => {
              window.location.href = '/';
            });
            return;
          }
          this.profileBasicData = x;
          this.isProfileSaved = true;
          this.formErrorMessage = null;
          window.scrollTo(0, 0);
          setTimeout((_) => {
            this.isProfileSaved = false;
          }, 2000);
        },
        (err) => {
          window.scrollTo(0, 0);
          setTimeout((_) => {
            this.formErrorMessage = null;
          }, 2500);
          this.formErrorMessage = 'Error occurred, try again';
        }
      );
  }

  deleteAccount() {
    this.setOpeningTab(false, false, true);
    this.openModal();
  }

  // functions used above
  setOpeningTab(...val: boolean[]) {
    this.settings.basic = val[0];
    this.settings.changePassword = val[1];
    this.settings.deleteAccount = val[2];
  }

  openModal() {
    const modalRef = this.modalService.open(NgbdModalComponent);

    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.content = this.content;
    modalRef.componentInstance.leftButtonName = this.leftButtonName;
    modalRef.componentInstance.rightButtonName = this.rightButtonName;
    modalRef.componentInstance.modalButtonLeftColor = this.modalButtonColor;
    modalRef.componentInstance.modalButtonRightColor = this.modalButtonColor;

    modalRef.componentInstance.onConfirm = () => this.onConfirm();
    modalRef.componentInstance.onClose = () => this.onClose();
  }

  isAtLeastOneInputFieldFilled(): boolean {
    return (
      this.profileBasicData.country !== this.countryName ||
      this.profileBasicData.city !== this.cityName ||
      this.profileBasicData.firstName !== this.firstName ||
      this.profileBasicData.lastName !== this.lastName ||
      this.profileBasicData.email !== this.emailAddress ||
      this.profileBasicData.username !== this.userName
    );
  }

  isDefaultImage(): boolean {
    return this.insertImage ? this.insertImage.indexOf('default-image.png') > -1 : false;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
