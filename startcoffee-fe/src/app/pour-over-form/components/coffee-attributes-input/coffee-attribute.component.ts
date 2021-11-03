import { SharedService } from '../../../shared/services/shared.service';
import { DateTimePickerService } from '../../../shared/services/date-time-picker.service';
import { AppPageIdState } from '../../../states/page-meta-data-action';
import { CoffeeMetaDataState } from '../../../states/coffee-meta-data.action';
import { CoffeeFlavourModel } from '../../models/flavour.model';
import { CommentTextState, SetCommentTextArea } from '../../states/comment-area.state';
import { Router } from '@angular/router';
import { CoffeeSubmitService } from '../../services/coffee-submit.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { activateStep, isDigitOnly, getCurrentDateTimeString } from '../../../utils';
import { URL } from '../../../../environments/url';
import { Store } from '@ngxs/store';
import { CoffeeOriginStates } from '../coffee-origin-input/states/combined.states';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { PopulateCountryList, SelectCountry } from '../coffee-origin-input/states/country-name.action';
import { CoffeeBrewStates } from '../brewing-process-input/states/combined.states';
import { SetCoffeeWaterRatio } from '../brewing-process-input/states/coffee-water-ration.action';
import { SetGrindingType } from '../brewing-process-input/states/grind-type.action';
import { SetBrewMethod } from '../brewing-process-input/states/brew-method.action';
import { SetBrewTime } from '../brewing-process-input/states/brewing-time.action';

import { SetProductionDate } from '../coffee-origin-input/states/coffee-production-date.action';
import { SetRoastingImage } from '../coffee-origin-input/states/roasting-image.action';
import { ChooseCoffeeProcess } from '../coffee-origin-input/states/coffee-process.action';
import { SetAttributes } from './states/attributes.action';
import { SetFlavour, CoffeeFlavourState } from './states/flavour.action';
import { CoffeeAttributesStates } from './states/combined.state';
import { Observable, Subject } from 'rxjs';
import { SetAppPageId } from '../../../states/page-meta-data-action';

import Chart from 'chart.js';
import { AttributesInputModel } from '../../models/attributes.model';
import { RouteGuardService } from '../../services/route-guard.service';
import { CoffeeBrewMakingModel } from '../../models/brew-making.model';
import { SetManufacturerName } from '../coffee-origin-input/states/coffee-manufacturer';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';

@Component({
  selector: 'app-coffee-attribute',
  templateUrl: './coffee-attribute.component.html',
})
export class CoffeeAttributeComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  // ngModel
  chart: any;
  chartData = {
    labels: ['Acidity', 'Sweetness', 'Bitterness', 'Intensity'],
    datasets: [
      {
        label: 'Attributes',
        data: [0, 0, 0, 0] as any,
        backgroundColor: ['rgba(1, 72, 42, 0.4)'],
      },
    ],
  };
  timeoutId;

  // textAreaCommentSm: string;
  textAreaCommentLg: string;

  attributes: AttributesInputModel = {
    acidity: null,
    bitterness: null,
    sweetness: null,
    intensity: null,
    overall: null,
  };
  attributesText: any = {
    acidity: null,
    bitterness: null,
    sweetness: null,
    intensity: null,
    overall: null,
  };
  attributesValid: any = {
    acidity: false,
    bitterness: false,
    sweetness: false,
    intensity: false,
    overall: false,
  };
  progress: AttributesInputModel = {
    acidity: 0,
    bitterness: 0,
    sweetness: 0,
    intensity: 0,
    overall: 0,
  };

  flavour: CoffeeFlavourModel = { fruity: false, nutty: false, choco: false, caramel: false, floral: false };
  // extractionTypeRadio = null;
  clicked = false;
  disableSubmitButton = false;

  coffeeOriginJson;
  coffeeInMaking;
  brewTimeValue = { minute: null, second: null };

  @ViewChild('donut') donut: ElementRef;

  constructor(
    private coffeeSubmitService: CoffeeSubmitService,
    private store: Store,
    private router: Router,
    private shared: SharedService,
    private routeGuardService: RouteGuardService,
    private dateTimePickerService: DateTimePickerService
  ) {}

  ngOnInit() {
    // this.textAreaCommentSm = this.store.selectSnapshot(CommentTextState).commentText;
    this.textAreaCommentLg = this.store.selectSnapshot(CommentTextState).commentText;

    activateStep(3);
    this.attributesResult();
    this.coffeeInMaking = this.getOriginBrewPropsInMaking(
      this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin),
      this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew)
    );
    if (this.coffeeInMaking.brewTime) {
      this.brewTimeValue.minute =
        this.coffeeInMaking.brewTime.minute.toString().length === 1
          ? '0' + this.coffeeInMaking.brewTime.minute
          : this.coffeeInMaking.brewTime.minute;
      this.brewTimeValue.second =
        this.coffeeInMaking.brewTime.second.toString().length === 1
          ? '0' + this.coffeeInMaking.brewTime.second
          : this.coffeeInMaking.brewTime.second;
    }
    this.coffeeInMaking.processType = this.shared.processingTypeNameMapping(this.coffeeInMaking.processType);
    this.coffeeInMaking.roastingType = this.shared.roastingTypeNameMapping(this.coffeeInMaking.roastingType);
    this.coffeeInMaking.grindType = this.coffeeInMaking.grindType;
    this.coffeeInMaking.ratio = Number(this.coffeeInMaking.ratio).toFixed();

    const state = this.store.selectSnapshot(CoffeeAttributesStates.inputFormAttributes);

    this.setFormValues(
      state.attributes ? state.attributes.acidity : null,
      state.attributes ? state.attributes.bitterness : null,
      state.attributes ? state.attributes.sweetness : null,
      state.attributes ? state.attributes.intensity : null,
      state.attributes ? state.attributes.overall : null,
      state.flavour
    );
  }

  ngAfterViewInit() {
    const radarChartHtml = this.donut.nativeElement.getContext('2d');
    this.chart = new Chart(radarChartHtml, {
      type: 'radar',
      data: this.chartData,
      options: {
        scale: {
          ticks: {
            min: 0,
            max: 10,
          },
        },
      },
    });
    const state = this.store.selectSnapshot(CoffeeAttributesStates.inputFormAttributes);
    if (state.attributes) {
      this.setFormValidation();
      this.updateChart();
    }
    setTimeout((_) => {
      this.shared.scrollToPageTopView();
      this.shared.setActiveStepIndex(2);
    });
  }

  // changeTextAreaSm() {
  //   // (document.getElementById('comment-section') as HTMLInputElement).value = this.textAreaCommentSm;
  //   this.store.dispatch(new SetCommentTextArea(this.textAreaCommentSm));
  // }

  changeTextAreaLg() {
    // (document.getElementById('comment-section') as HTMLInputElement).value = this.textAreaCommentSm;
    this.store.dispatch(new SetCommentTextArea(this.textAreaCommentLg));
  }

  onChangeAcidity() {
    this.store.dispatch(
      new SetAttributes({
        acidity: this.attributes.acidity,
        bitterness: this.attributes.bitterness,
        sweetness: this.attributes.sweetness,
        intensity: this.attributes.intensity,
        overall: this.attributes.overall,
      })
    );
    this.attributesValid.acidity = this.isInputValid(this.attributes.acidity);

    if (this.attributes.acidity >= 0 && this.attributes.acidity <= 10) {
      this.progress.acidity = this.attributes.acidity * 10;
      this.updateChart();
    } else {
      this.progress.acidity = 0;
      this.resetChart();
    }
  }

  onChangeBitterness() {
    this.store.dispatch(
      new SetAttributes({
        acidity: this.attributes.acidity,
        bitterness: this.attributes.bitterness,
        sweetness: this.attributes.sweetness,
        intensity: this.attributes.intensity,
        overall: this.attributes.overall,
      })
    );
    this.attributesValid.bitterness = this.isInputValid(this.attributes.bitterness);

    if (this.attributes.bitterness >= 0 && this.attributes.bitterness <= 10) {
      this.progress.bitterness = this.attributes.bitterness * 10;
      this.updateChart();
    } else {
      this.progress.bitterness = 0;
      this.resetChart();
    }
  }

  onChangeIntensity() {
    this.store.dispatch(
      new SetAttributes({
        acidity: this.attributes.acidity,
        bitterness: this.attributes.bitterness,
        sweetness: this.attributes.sweetness,
        intensity: this.attributes.intensity,
        overall: this.attributes.overall,
      })
    );
    this.attributesValid.intensity = this.isInputValid(this.attributes.intensity);

    if (this.attributes.intensity >= 0 && this.attributes.intensity <= 10) {
      this.progress.intensity = this.attributes.intensity * 10;
      this.updateChart();
    } else {
      this.progress.intensity = 0;
      this.resetChart();
    }
  }

  onChangeSweetness() {
    this.store.dispatch(
      new SetAttributes({
        acidity: this.attributes.acidity,
        bitterness: this.attributes.bitterness,
        sweetness: this.attributes.sweetness,
        intensity: this.attributes.intensity,
        overall: this.attributes.overall,
      })
    );
    this.attributesValid.sweetness = this.isInputValid(this.attributes.sweetness);

    if (this.attributes.sweetness >= 0 && this.attributes.sweetness <= 10) {
      this.progress.sweetness = this.attributes.sweetness * 10;
      this.updateChart();
    } else {
      this.progress.sweetness = 0;
      this.resetChart();
    }
  }

  onChangeOverall() {
    this.store.dispatch(
      new SetAttributes({
        acidity: this.attributes.acidity,
        bitterness: this.attributes.bitterness,
        sweetness: this.attributes.sweetness,
        intensity: this.attributes.intensity,
        overall: this.attributes.overall,
      })
    );
    this.attributesValid.overall = this.isInputOverallValid(this.attributes.overall);
    this.progress.overall =
      this.attributes.overall >= 0 && this.attributes.overall <= 10 ? this.attributes.overall * 10 : 0;
  }

  // flavours change
  onFlavourChangeFruity(flag: boolean) {
    this.flavour = { ...this.flavour, fruity: flag };
    this.store.dispatch(new SetFlavour(this.flavour));
  }

  onFlavourChangeNutty(flag: boolean) {
    this.flavour = { ...this.flavour, nutty: flag };
    this.store.dispatch(new SetFlavour(this.flavour));
  }

  onFlavourChangeChoco(flag: boolean) {
    this.flavour = { ...this.flavour, choco: flag };
    this.store.dispatch(new SetFlavour(this.flavour));
  }

  onFlavourChangeCaramel(flag: boolean) {
    this.flavour = { ...this.flavour, caramel: flag };
    this.store.dispatch(new SetFlavour(this.flavour));
  }

  onFlavourChangeFloral(flag: boolean) {
    this.flavour = { ...this.flavour, floral: flag };
    this.store.dispatch(new SetFlavour(this.flavour));
  }

  // onExtractedChange(event: any) {
  //   this.store.dispatch(new SetExtraction(event.target.value));
  // }

  submitForm() {
    clearInterval(this.timeoutId);
    this.clicked = true;

    const originState = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    const brewState = this.store.selectSnapshot(CoffeeBrewStates.inputFormBrew);
    const coffeeMetaState = this.store.selectSnapshot(CoffeeMetaDataState);
    const appMetaData = this.store.selectSnapshot(AppPageIdState);

    const date = getCurrentDateTimeString();

    // if useCoffee is selected on the profile page
    if (appMetaData.isCoffeeUseClicked) {
      if (this.isFormBrewValid(brewState) && this.isFormAttributesValid(this.attributesValid)) {
        this.disableSubmitButton = true;
        this.httpPostBrew(
          brewState,
          { originId: coffeeMetaState.originId, country: originState.country },
          brewState.brewSubmitDate
        )
          .pipe(
            mergeMap((x) => this.httpPostAttributes(x, date)),
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
            (x) => {
              this.router.navigate(['/profile']).then(() => this.shared.scrollToPageTopView());
              this.resetEntireFormState();
              this.routeGuardService.canNavigateToForm(false);
            },
            (err) => {}
          );
      } else {
        this.timeoutId = setTimeout((_) => {
          this.shared.scrollIntoValidationView();
        });
      }
    } else {
      // if normal flow with 3 steps occurred
      if (
        this.isFormOriginValid(originState) &&
        this.isFormBrewValid(brewState) &&
        this.isFormAttributesValid(this.attributesValid)
      ) {
        this.disableSubmitButton = true;

        this.httpPostOrigin(originState)
          .pipe(
            mergeMap((x) => this.httpPostBrew(brewState, x, brewState.brewSubmitDate)),
            mergeMap((x) => this.httpPostAttributes(x, date)),
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
            (x) => {
              this.router.navigate(['/profile']).then(() => this.shared.scrollToPageTopView());
              this.resetEntireFormState();
              this.routeGuardService.canNavigateToForm(false);
            },
            (err) => {}
          );
      } else {
        this.timeoutId = setTimeout((_) => {
          this.shared.scrollIntoValidationView();
        });
      }
    }
  }

  // ALL input-text FORM VALIDATION
  isInputValid(value: number): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!isDigitOnly(value.toString())) {
      return false;
    }
    // everything but number
    if (!this.isNumber(value)) {
      return false;
    }
    // number and not in range 1-10
    if (!(value > 0 && value <= 10)) {
      return false;
    }

    return true;
  }

  // only for overall property
  isInputOverallValid(value: number): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (!isDigitOnly(value.toString())) {
      return false;
    }
    // everything but number
    if (!this.isNumber(value)) {
      return false;
    }
    // number and not in range 1-10
    if (!(value > 0 && value <= 10)) {
      return false;
    }

    return true;
  }

  isFormBrewValid(state): boolean {
    return state.brewMethodType && state.grindType && state.ratio;
  }

  isFormAttributesValid(obj): boolean {
    // flavours, extracted not included, all false by default
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  }

  isNumber(value: any): boolean {
    return !isNaN(parseInt(`${value}`, 10));
  }

  isFormOriginValid(state): boolean {
    return state.country && state.roastingType;
  }

  // XHR POST EXTENDED
  httpPostOrigin(originState: any): Observable<any> {
    return this.coffeeSubmitService.sendCoffeeOriginData(URL.apiCoffeeOrigin, {
      country: originState.country,
      roastingType: originState.roastingType,
      processingType: originState.processType,
      manufacturer: originState.manufacturer,
      originSubmitDate: originState.originSubmitDate,
      productionDate: originState.productionDate,
    });
  }

  httpPostBrew(brewState: any, x: any, brewDate: string): Observable<any> {
    return this.coffeeSubmitService.sendCoffeeBrewData(URL.apiCoffeeBrew, {
      technique: 'pour_over',
      brewMethod: brewState.brewMethodType,
      grindType: brewState.grindType,
      ratio: {
        ratio: brewState.ratio,
        coffeeNumerator: brewState.coffeeNumerator,
        waterDenominator: brewState.waterDenominator,
      },
      brewTime: brewState.brewTime,
      brewSubmitDate: brewDate,
      coffeeOriginId: x.originId,
      country: x.country,
    });
  }

  httpPostAttributes(x: any, date: string): Observable<any> {
    return this.coffeeSubmitService.sendCoffeeAttributesData(URL.apiCoffeeAttributes, {
      acidity: this.attributes.acidity,
      sweetness: this.attributes.sweetness,
      bitterness: this.attributes.bitterness,
      intensity: this.attributes.intensity,
      overall: this.attributes.overall,
      flavour: this.flavour,
      commentText: this.getCommentText(),
      formSubmitDate: date,
      coffeeOriginId: x.originId,
      coffeeBrewId: x.brewId,
    });
  }

  getCommentText(): string {
    const commentText = this.store.selectSnapshot(CommentTextState).commentText;
    return commentText ? commentText.trim() : '';
  }

  // none angular form
  setFormValues(...val: any[]) {
    this.attributes.acidity = val[0];
    this.progress.acidity = this.attributes.acidity * 10;

    this.attributes.bitterness = val[1];
    this.progress.bitterness = this.attributes.bitterness * 10;

    this.attributes.sweetness = val[2];
    this.progress.sweetness = this.attributes.sweetness * 10;

    this.attributes.intensity = val[3];
    this.progress.intensity = this.attributes.intensity * 10;

    this.attributes.overall = val[4];
    this.progress.overall = this.attributes.overall * 10;

    // filling all flavour properties
    this.flavour.fruity = val[5].fruity;
    this.flavour.nutty = val[5].nutty;
    this.flavour.choco = val[5].choco;
    this.flavour.caramel = val[5].caramel;
    this.flavour.floral = val[5].floral;
    // this.extractionTypeRadio = val[6];
  }

  setFormValidation() {
    Object.keys(this.attributes).map((key) => {
      this.attributesValid[key] = this.isInputValid(this.attributes[key]) ? true : false;
    });
  }

  // coffee in making display table
  getOriginBrewPropsInMaking(stateOrigin, stateBrew): CoffeeBrewMakingModel {
    return {
      country: stateOrigin.country,
      processType: stateOrigin.processType,
      manufacturer: stateOrigin.manufacturer,
      productionDate: stateOrigin.productionDate,
      roastingType: stateOrigin.roastingType,
      brewMethodType: stateBrew.brewMethodType,
      brewTime: stateBrew.brewTime,
      grindType: stateBrew.grindType,
      ratio: stateBrew.ratio,
    };
  }

  // display results, right side (lg devices)
  combineBrewAndAttributes(arr: any[]) {
    const arrayBrewAttributes = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].coffeeBrew.length; j++) {
        arrayBrewAttributes.push({ ...arr[i].coffeeBrew[j], ...arr[i].coffeeAttributes[j] });
      }
    }
    return arrayBrewAttributes;
  }

  attributesResult() {
    const originState = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    this.coffeeSubmitService
      .getCoffeeResult(URL.apiCoffeeBrewResult, { params: { country: originState.country } })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.coffeeOriginJson = this.combineBrewAndAttributes(x);
          this.coffeeOriginJson = this.coffeeOriginJson
            .sort(this.shared.compareDate('brewSubmitDate', OrderTypeEnum.DESC))
            .filter((x: any, i: number) => i < 3)
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

  updateChart() {
    const attrState = this.store.selectSnapshot(CoffeeAttributesStates.inputFormAttributes);
    this.chartData.datasets[0].data = [
      attrState.attributes.acidity,
      attrState.attributes.sweetness,
      attrState.attributes.bitterness,
      attrState.attributes.intensity,
    ];
    this.chart.update();
  }

  resetChart() {
    this.chartData.datasets[0].data = [0, 0, 0, 0];
    this.chart.update();
  }

  resetEntireFormState() {
    // origin reset
    this.dateTimePickerService.sendDateTime({ year: 0, month: 0, day: 0 });
    this.store.dispatch(new PopulateCountryList([]));
    this.store.dispatch(new SetProductionDate(null));
    this.store.dispatch(new SelectCountry(null));
    this.store.dispatch(new SetRoastingImage(null));
    this.store.dispatch(new ChooseCoffeeProcess(null));
    this.store.dispatch(new SetManufacturerName(null, null));

    // brew reset
    this.store.dispatch(new SetBrewTime(null, null));
    this.store.dispatch(new SetBrewMethod(null));
    this.store.dispatch(new SetGrindingType(null));
    this.store.dispatch(new SetCoffeeWaterRatio(null, null, null));

    // attributes reset
    this.store.dispatch(new SetAttributes(null));
    this.store.dispatch(new SetFlavour([]));
    this.store.dispatch(new SetCommentTextArea(''));

    this.store.dispatch(new SetAppPageId(false, [], null));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
