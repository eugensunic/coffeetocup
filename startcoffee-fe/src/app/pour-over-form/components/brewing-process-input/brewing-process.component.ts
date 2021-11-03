import { CoffeeOriginMakingModel } from '../../models/origin-making.model';
import { OrderTypeEnum } from '../../../shared/models/order-type.enum';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SetCommentTextArea, CommentTextState } from '../../states/comment-area.state';
import { getCurrentDateTimeString } from 'src/app/utils';
import { CoffeeOriginStates } from '../coffee-origin-input/states/combined.states';
import { CoffeeSubmitService } from '../../services/coffee-submit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, filter } from 'rxjs/operators';
import { URL } from '../../../../environments/url';
import { SetBrewTime, CoffeeBrewTimeState, BrewTimeModel } from './states/brewing-time.action';
import {
  SetCoffeeWaterRatio,
  CoffeeWaterRatioState,
  CoffeeWaterRatioModel,
} from './states/coffee-water-ration.action';
import { SetBrewMethod, CoffeeBrewMethodState, BrewMethodModel } from './states/brew-method.action';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { activateStep } from '../../../utils';
import { SetGrindingType, CoffeeGrindingTypeState, GrindTypeModel } from './states/grind-type.action';
import { Store, Select } from '@ngxs/store';
import { DateTimePickerService } from '../../../shared/services/date-time-picker.service';
import { CoffeeBrewStates } from './states/combined.states';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brewing-process',
  templateUrl: './brewing-process.component.html',
})
export class BrewingProcessComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('grindingFine') grindingFine;
  @ViewChild('grindingMediumFine') grindingMediumFine;
  @ViewChild('grindingMedium') grindingMedium;
  @ViewChild('grindingMediumCoarse') grindingMediumCoarse;
  @ViewChild('grindingCoarse') grindingCoarse;

  // textAreaCommentSm: string;
  textAreaCommentLg: string;
  timeoutId;

  brewForm: FormGroup;
  coffeeOriginJson;
  coffeeInMaking;

  brewRatioValue;
  brewTimeValue;

  coffeeWaterCalculation: string;
  clicked = false;

  grindingTypeRadio = null;
  brewingTypeRadio = null;

  private ngUnsubscribe = new Subject();

  @Select(CoffeeBrewMethodState)
  brewMethod$: Observable<BrewMethodModel>;
  @Select(CoffeeGrindingTypeState)
  grind$: Observable<GrindTypeModel>;
  @Select(CoffeeWaterRatioState)
  ratio$: Observable<CoffeeWaterRatioModel>;

  constructor(
    private store: Store,
    private dateTimePickerService: DateTimePickerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private shared: SharedService,
    private coffeeSubmitService: CoffeeSubmitService
  ) {}

  ngOnInit() {
    // used for validation in html file
    this.ratio$.subscribe((obj) => {
      this.brewRatioValue = obj.ratio;
    });

    // this.textAreaCommentSm = this.store.selectSnapshot(CommentTextState).commentText;
    this.textAreaCommentLg = this.store.selectSnapshot(CommentTextState).commentText;
    activateStep(2);
    this.brewResult();
    this.coffeeInMaking = this.getOriginPropsInMaking(
      this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin)
    );
    // this.coffeeInMaking.

    this.coffeeInMaking.processType = this.shared.processingTypeNameMapping(this.coffeeInMaking.processType);
    this.coffeeInMaking.roastingType = this.shared.roastingTypeNameMapping(this.coffeeInMaking.roastingType);
    const state = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);
    this.brewForm = this.formBuilder.group(this.setValidators(null, null, null, null));

    this.dateTimePickerService
      .getMinutesSeconds()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (brewTime) => {
          this.brewTimeValue = brewTime;
          if (this.isBrewTimeValid()) {
            const tpMinute = document.querySelector('.ngb-tp-minute');
            const tpSecond = document.querySelector('.ngb-tp-second');

            const minute = tpMinute && tpMinute.children[1];
            const seconds = tpSecond && tpSecond.children[1];

            if (minute && seconds) {
              minute.classList.remove('brew-ratio-validation-error');
              seconds.classList.remove('brew-ratio-validation-error');
            }
          }
          this.store.dispatch(new SetBrewTime(brewTime, null));
        },
        (err) => {}
      );
    this.setFormValues(
      state.brewMethodType,
      state.grindType,
      state.coffeeNumerator,
      state.waterDenominator,
      state.brewTime
    );
  }

  ngAfterViewInit() {
    const state = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);
    this.handleGrindingType(state.grindType);
    setTimeout(() => {
      this.shared.scrollToPageTopView();
      this.shared.setActiveStepIndex(1);
    });
  }

  // changeTextAreaSm() {
  //   (document.getElementById('comment-section') as HTMLInputElement).value = this.textAreaCommentSm;
  //   this.store.dispatch(new SetCommentTextArea(this.textAreaCommentSm));
  // }

  brewMethodInfoClick(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  changeTextAreaLg() {
    // (document.getElementById('comment-section-lg') as HTMLInputElement).value = this.textAreaCommentLg;
    this.store.dispatch(new SetCommentTextArea(this.textAreaCommentLg));
  }

  onChangeBrewMethod(event) {
    this.store.dispatch(new SetBrewMethod(event.target.value));
  }

  onChangeBrewGrind(event) {
    this.onGrindingImageClick(event.target.value);
    this.store.dispatch(new SetGrindingType(event.target.value));
  }

  onChangeBrewWater() {
    const calculation: string = (
      this.brewForm.controls.brewWater.value / this.brewForm.controls.brewCoffee.value
    ).toFixed(1);
    this.coffeeWaterCalculation = this.isValidNumber(calculation) ? calculation : '';
    this.store.dispatch(
      new SetCoffeeWaterRatio(
        this.brewForm.controls.brewCoffee.value,
        this.brewForm.controls.brewWater.value,
        this.coffeeWaterCalculation
      )
    );
  }

  onChangeBrewCoffee() {
    const calculation: string = (
      this.brewForm.controls.brewWater.value / this.brewForm.controls.brewCoffee.value
    ).toFixed(1);
    this.coffeeWaterCalculation = this.isValidNumber(calculation) ? calculation : '';
    this.store.dispatch(
      new SetCoffeeWaterRatio(
        this.brewForm.controls.brewCoffee.value,
        this.brewForm.controls.brewWater.value,
        this.coffeeWaterCalculation
      )
    );
  }

  // method fires on button click (NEXT)
  nextStepAttributes() {
    clearInterval(this.timeoutId);
    this.clicked = true;
    if (!this.isBrewTimeValid()) {
      const tpMinute = document.querySelector('.ngb-tp-minute');
      const tpSecond = document.querySelector('.ngb-tp-second');

      const minute = tpMinute && tpMinute.children[1];
      const seconds = tpSecond && tpSecond.children[1];

      if (minute && seconds) {
        minute.classList.add('brew-ratio-validation-error');
        seconds.classList.add('brew-ratio-validation-error');
      }
    }
    const coffeeBrewState = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);

    if (!this.isFormValid(coffeeBrewState)) {
      this.timeoutId = setTimeout((_) => {
        this.shared.scrollIntoValidationView();
      });
      return;
    }
    // setting brewSubmitDate
    this.store.dispatch(new SetBrewTime(coffeeBrewState.brewTime, getCurrentDateTimeString()));
    this.router.navigate(['/attributes']).then((_) => this.shared.scrollToPageTopView());
  }

  isBrewMethodSelected() {
    const state = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);
    return !!state.brewMethodType;
  }

  isGrindSelected() {
    const state = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);
    return !!state.grindType;
  }

  isFormValid(formObj: any): boolean {
    return formObj.brewMethodType && formObj.grindType && this.isBrewRatioValid() && this.isBrewTimeValid();
  }

  isBrewTimeValid(): boolean {
    return !!this.brewTimeValue && this.brewTimeValue.minute > 0;
  }

  isBrewRatioValid(): boolean {
    return !!this.brewRatioValue && Number(this.brewRatioValue) >= 1;
  }

  isValidNumber(inputNum: string): boolean {
    return !Number.isNaN(parseInt(inputNum, 10));
  }

  setValidators(brewing, grinding, brewCoffeeVal, brewWaterVal): any {
    return {
      brewing: [brewing, Validators.required],
      grinding: [grinding, Validators.required],
      brewCoffee: [brewCoffeeVal, Validators.required],
      brewWater: [brewWaterVal, Validators.required],
    };
  }

  setFormValues(...val: any[]) {
    this.brewForm.controls.brewing.setValue(val[0]);
    this.brewForm.controls.grinding.setValue(val[1]);
    this.brewForm.controls.brewCoffee.setValue(val[2]);
    this.brewForm.controls.brewWater.setValue(val[3]);
    // for radio buttons
    this.brewingTypeRadio = val[0];
    this.grindingTypeRadio = val[1];
    // handle ngTimeForm
    this.dateTimePickerService.sendMinutesSeconds(val[4]);

    // handle calculation result
    this.coffeeWaterCalculation = val[3] && val[2] ? (val[3] / val[2]).toFixed(1).toString() : '';
  }

  brewResult() {
    const originState = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    this.coffeeSubmitService
      .getCoffeeResult(URL.apiCoffeeBrewResult, { params: { country: originState.country } })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.coffeeOriginJson = this.combineBrewAndAttributes(x);
          this.coffeeOriginJson = this.coffeeOriginJson
            .sort(this.shared.compareDate('brewSubmitDate', OrderTypeEnum.DESC))
            .filter((x, i: number) => i < 3)
            .map((x) => {
              return {
                ...x,
                tastePercentage: this.shared.tastingValuesToPercentage(x),
                ratio: {
                  ...x.ratio,
                  ratio: x.ratio && x.ratio.ratio ? Number(x.ratio.ratio).toFixed(0) : '',
                },
              };
            });
        },
        (err) => {}
      );
  }

  // coffee in making properties
  getOriginPropsInMaking(state): CoffeeOriginMakingModel {
    return {
      country: state.country,
      processType: state.processType,
      manufacturer: state.manufacturer,
      productionDate: state.productionDate,
      roastingType: state.roastingType,
    };
  }

  combineBrewAndAttributes(arr: any[]) {
    const arrayBrewAttributes = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].coffeeBrew.length; j++) {
        arrayBrewAttributes.push({
          country: arr[i].country,
          ...arr[i].coffeeBrew[j],
          ...arr[i].coffeeAttributes[j],
        });
      }
    }
    return arrayBrewAttributes;
  }

  onGrindingImageClick(value) {
    this.handleGrindingType(value);
  }

  handleGrindingType(value) {
    const border = '4px solid #ececec';
    const borderRadius = '5px';
    this.clearAllGrindingStyles();

    if (value === 'fine') {
      this.grindingFine.nativeElement.style.border = border;
      this.grindingFine.nativeElement.style.borderRadius = borderRadius;
    }
    if (value === 'medium-fine') {
      this.grindingMediumFine.nativeElement.style.border = border;
      this.grindingMediumFine.nativeElement.style.borderRadius = borderRadius;
    }
    if (value === 'medium') {
      this.grindingMedium.nativeElement.style.border = border;
      this.grindingMedium.nativeElement.style.borderRadius = borderRadius;
    }
    if (value === 'medium-coarse') {
      this.grindingMediumCoarse.nativeElement.style.border = border;
      this.grindingMediumCoarse.nativeElement.style.borderRadius = borderRadius;
    }
    if (value === 'coarse') {
      this.grindingCoarse.nativeElement.style.border = border;
      this.grindingCoarse.nativeElement.style.borderRadius = borderRadius;
    }
  }

  clearAllGrindingStyles() {
    this.grindingFine.nativeElement.style.border = 'none';
    this.grindingFine.nativeElement.style.borderRadius = '0px';

    this.grindingMediumFine.nativeElement.style.border = 'none';
    this.grindingMediumFine.nativeElement.style.borderRadius = '0px';

    this.grindingMedium.nativeElement.style.border = 'none';
    this.grindingMedium.nativeElement.style.borderRadius = '0px';

    this.grindingMediumCoarse.nativeElement.style.border = 'none';
    this.grindingMediumCoarse.nativeElement.style.borderRadius = '0px';

    this.grindingCoarse.nativeElement.style.border = 'none';
    this.grindingCoarse.nativeElement.style.borderRadius = '0px';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
