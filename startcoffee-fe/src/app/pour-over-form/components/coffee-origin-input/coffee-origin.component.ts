import { SharedService } from '../../../shared/services/shared.service';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';

import { SetMetaData } from 'src/app/states/coffee-meta-data.action';
import { CoffeeMetaDataState } from '../../../states/coffee-meta-data.action';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { URL } from '../../../../environments/url';

import {
  CountryProductionDateState,
  CountryProductionDateModel,
  SetProductionDate,
} from './states/coffee-production-date.action';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { Countries } from './coffee-origin-countries';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  CountryNameState,
  CountryNameModel,
  PopulateCountryList,
  SelectCountry,
} from './states/country-name.action';

import { RoastingImageState, RoastingImageModel, SetRoastingImage } from './states/roasting-image.action';

import { DateTimePickerService } from '../../../shared/services/date-time-picker.service';
import { CoffeeOriginStates } from './states/combined.states';
import { ChooseCoffeeProcess } from './states/coffee-process.action';
import { activateStep, getCurrentDateTimeString } from '../../../utils';
import { CoffeeSubmitService } from '../../services/coffee-submit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from 'src/app/login/services/login.service';
import { SetCommentTextArea, CommentTextState } from '../../states/comment-area.state';
import { ModalChild } from '../../../shared/components/ngbd-modal/ngbd-child.interface';
import { NgbdModalComponent } from '../../../shared/components/ngbd-modal/ngbd-modal.component';
import { SetManufacturerName } from './states/coffee-manufacturer';
import { ThrowStmt } from '@angular/compiler';

/*
NOTE:
Elevation has been removed but let it stay in case we
decide to go to production with it, if not we'll remove it
*/
@Component({
  selector: 'app-coffee-origin',
  templateUrl: './coffee-origin.component.html',
})
export class CoffeeOriginComponent implements OnInit, OnDestroy, AfterViewInit, ModalChild {
  @ViewChild('roastingLight') roastingLight;
  @ViewChild('roastingMedium') roastingMedium;
  @ViewChild('roastingDark') roastingDark;

  // textAreaCommentSm: string;
  textAreaCommentLg: string;
  timeoutId = null;

  coffeeForm: FormGroup;
  clicked = false;

  coffeeOriginJson;

  processingTypeRadio = null;
  roastingTypeRadio = null;

  productionDate = null;

  private ngUnsubscribe = new Subject();

  // interface fields
  name = 'Guide through first step';
  content = `<p>
  This is the first step where you must enter the required field regarding your coffee.</p><p> First step is
  created for single origin coffees only.
  </br>
  In order to add a coffee all three steps should be completed at once.</p>`;
  rightButtonName = 'OK';

  @Select(CountryNameState)
  countryName$: Observable<CountryNameModel>;
  @Select(RoastingImageState)
  roastingImage$: Observable<RoastingImageModel>;
  @Select(CountryProductionDateState)
  countryProductionDate$: Observable<CountryProductionDateModel>;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private dateTimePickerService: DateTimePickerService,
    private router: Router,
    private modalService: NgbModal,
    private coffeeSubmitService: CoffeeSubmitService,
    private loginService: LoginService,
    private shared: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  // interface methods, onConfirm, onClose
  onConfirm(): void {
    const metaState = this.store.selectSnapshot(CoffeeMetaDataState);

    this.coffeeSubmitService
      .sendOriginModalConfirmation(URL.apiUserSettings, {
        originModalConfirmed: true,
        gdprConfirmed: metaState.settings.gdprConfirmed,
      })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {});
  }

  onClose(): void {}

  ngOnInit() {
    // this.textAreaCommentSm = this.store.selectSnapshot(CommentTextState).commentText;
    this.textAreaCommentLg = this.store.selectSnapshot(CommentTextState).commentText;
    this.originResult();
    this.coffeeForm = this.formBuilder.group(this.setValidators(null, null, null, null));
    activateStep(1);

    this.store.dispatch(new PopulateCountryList(Countries));
    this.dateTimePickerService
      .getDateTime()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        this.productionDate = x;
        this.store.dispatch(new SetProductionDate(x));
      });

    const state = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);

    this.setFormValues(
      state.country,
      state.roastingType,
      state.processType,
      state.productionDate,
      state.manufacturer
    );
  }

  // try to eliminate
  ngAfterViewInit() {
    const state = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    this.handleRoastingType(state.roastingType);
    setTimeout(() => {
      this.shared.setActiveStepIndex(0);
      const metaState = this.store.selectSnapshot(CoffeeMetaDataState);
      this.loginService
        .getUserSettings(URL.apiUserSettings)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (x) => {
            this.store.dispatch(
              new SetMetaData(metaState.originId, metaState.brewId, {
                originModalConfirmed: x ? x.originModalConfirmed : false,
                gdprConfirmed: x ? x.gdprConfirmed : false,
              })
            );

            if (!this.isOriginConfirmed(x)) {
              this.openModal();
            }
          },
          (err) => {}
        );
    });
  }

  setValidators(
    countryDefaultValue,
    roastingDefaultValue,
    processingDefaultValue,
    manufacturerDefaultValue
  ): any {
    return {
      country: [countryDefaultValue, Validators.required],
      roasting: [roastingDefaultValue, Validators.required],
      process: [processingDefaultValue],
      manufacturer: [manufacturerDefaultValue],
    };
  }

  // changeTextAreaSm() {
  //   // (document.getElementById('comment-section-sm') as HTMLInputElement).value = this.textAreaCommentSm;
  //   this.store.dispatch(new SetCommentTextArea(this.textAreaCommentSm));
  // }

  changeTextAreaLg() {
    // (document.getElementById('comment-section-lg') as HTMLInputElement).value = this.textAreaCommentLg;
    this.store.dispatch(new SetCommentTextArea(this.textAreaCommentLg));
  }

  onChangeCountry() {
    this.store.dispatch(new SelectCountry(this.coffeeForm.controls.country.value));
  }

  onChangeRoastingImage(event: any) {
    this.onRoastingImageClick(event.target.value);
    this.store.dispatch(new SetRoastingImage(event.target.value));
  }

  onChangeProcess(event: any) {
    this.store.dispatch(new ChooseCoffeeProcess(event.target.value));
  }

  onChangeManufacturer() {
    this.store.dispatch(new SetManufacturerName(this.coffeeForm.controls.manufacturer.value, null));
  }

  // method fires on button click (NEXT)
  nextStepBrewing() {
    clearInterval(this.timeoutId);
    this.clicked = true;
    const state = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    if (!this.isFormValid(state)) {
      this.timeoutId = setTimeout((_) => {
        this.shared.scrollIntoValidationView();
      });
      return;
    }
    this.store.dispatch(new SetManufacturerName(state.manufacturer, getCurrentDateTimeString()));
    this.router.navigate(['/brew']).then((_) => this.shared.scrollToPageTopView());
  }

  isOriginConfirmed(data): boolean {
    return data && data.originModalConfirmed;
  }

  isFormValid(state): boolean {
    return state.country && state.roastingType;
  }

  setFormValues(...val: any[]) {
    this.coffeeForm.controls.country.setValue(val[0]);
    this.coffeeForm.controls.roasting.setValue(val[1]);
    this.coffeeForm.controls.process.setValue(val[2]);
    this.dateTimePickerService.sendDateTime(val[3]);
    this.coffeeForm.controls.manufacturer.setValue(val[4]);
    // for radio buttons
    this.roastingTypeRadio = val[1];
    this.processingTypeRadio = val[2];
    // handle ngDateForm
  }

  originResult() {
    this.coffeeSubmitService
      .getCoffeeResult(URL.apiCoffeeOriginResult)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.coffeeOriginJson = x
            .sort(this.shared.compareDate('originSubmitDate', OrderTypeEnum.DESC))
            .filter((x, i) => i < 5)
            .map((x) => ({ ...x, roastingType: this.shared.roastingTypeNameMapping(x.roastingType) }));

          this.cdr.detectChanges();
        },
        (err) => {}
      );
  }

  openModal() {
    const modalRef = this.modalService.open(NgbdModalComponent);

    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.content = this.content;
    modalRef.componentInstance.rightButtonName = this.rightButtonName;
    modalRef.componentInstance.onConfirm = () => this.onConfirm();
    modalRef.componentInstance.onClose = () => this.onClose();
  }

  onRoastingImageClick(value) {
    this.handleRoastingType(value);
  }

  handleRoastingType(value) {
    if (value === 'light') {
      this.roastingMedium.nativeElement.style.opacity = 0.5;
      this.roastingDark.nativeElement.style.opacity = 0.5;
      this.roastingLight.nativeElement.style.opacity = 1;
    }
    if (value === 'medium') {
      this.roastingMedium.nativeElement.style.opacity = 1;
      this.roastingDark.nativeElement.style.opacity = 0.5;
      this.roastingLight.nativeElement.style.opacity = 0.5;
    }
    if (value === 'dark') {
      this.roastingMedium.nativeElement.style.opacity = 0.5;
      this.roastingDark.nativeElement.style.opacity = 1;
      this.roastingLight.nativeElement.style.opacity = 0.5;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
