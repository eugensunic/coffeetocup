import { OrderTypeEnum } from '../../../shared/models/order-type.enum';
import { getCurrentDateTimeString, removeNavbarDropdown } from 'src/app/utils';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { RouteGuardService } from '../../../pour-over-form/services/route-guard.service';
import { DateTimePickerService } from '../../../shared/services/date-time-picker.service';
import { StatisticsService } from '../../services/statistics.service';
import { ChartStatisticService } from '../../services/chart-statistic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoffeeSubmitService } from '../../../pour-over-form/services/coffee-submit.service';
import { SharedService } from '../../../shared/services/shared.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { URL } from '../../../../environments/url';
import { NgbdModalComponent } from '../../../shared/components/ngbd-modal/ngbd-modal.component';
import { Subject, Observable } from 'rxjs';
import { CoffeeMetaDataState, SetMetaData } from 'src/app/states/coffee-meta-data.action';
import { CoffeeOriginStates } from 'src/app/pour-over-form/components/coffee-origin-input/states/combined.states';
import {
  SelectCountry,
  PopulateCountryList,
} from '../../../pour-over-form/components/coffee-origin-input/states/country-name.action';
import { SetRoastingImage } from '../../../pour-over-form/components/coffee-origin-input/states/roasting-image.action';
import { ChooseCoffeeProcess } from '../../../pour-over-form/components/coffee-origin-input/states/coffee-process.action';
import { SetManufacturerName } from '../../../pour-over-form/components/coffee-origin-input/states/coffee-manufacturer';
import { SetProductionDate } from '../../../pour-over-form/components/coffee-origin-input/states/coffee-production-date.action';
import { SetAppPageId } from '../../../states/page-meta-data-action';
import { PageId } from '../../../pour-over-form/models/page-id.enum';
import { SetBrewTime } from '../../../pour-over-form/components/brewing-process-input/states/brewing-time.action';
import { SetBrewMethod } from '../../../pour-over-form/components/brewing-process-input/states/brew-method.action';
import { SetGrindingType } from '../../../pour-over-form/components/brewing-process-input/states/grind-type.action';
import { SetCoffeeWaterRatio } from '../../../pour-over-form/components/brewing-process-input/states/coffee-water-ration.action';
import { SetAttributes } from '../../../pour-over-form/components/coffee-attributes-input/states/attributes.action';
import { SetFlavour } from '../../../pour-over-form/components/coffee-attributes-input/states/flavour.action';
import { SetCommentTextArea } from '../../../pour-over-form/states/comment-area.state';
import {
  HeadingOverviewStatsState,
  SetHeadingOverviewStats,
} from '../../states/heading-overview-stats.action';

@Component({
  selector: 'app-user-default-profile',
  templateUrl: './user-default-profile.component.html',
})
export class UserDefaultProfileComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  isGuest = false;
  hideSharedIcon = false;
  hasQueryParams = false;
  countryFilter = '';

  uniqueCountries = [];

  coffeeJson: any;
  coffeeJsonDefault: any;
  coffeeJsonImmutable: any;
  coffeeAttributes: any;
  selectedFilter = 'default';

  showAttributesNums = [];
  showBrewsNums = [];
  showAttributesCountryNums = [];

  showActionPartSmDefault = [];
  showActionPartSmFiltered = [];

  showBasicTable = true;

  // remove and use directly in code
  avgPerOrigin = [];
  submitDates = [];

  coffeeUseClicked = false;

  @Select(HeadingOverviewStatsState)
  headerCoffeeStats$: Observable<any>;

  coffeeStats = { originAmount: null, brewAttributesAmount: null };
  header = { countryAmount: null, archiveAmount: null };

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private store: Store,
    private routeGuardService: RouteGuardService,
    private dateTimePickerService: DateTimePickerService,
    public statistics: StatisticsService,
    public chartstats: ChartStatisticService,
    private modalService: NgbModal,
    private coffeeSubmitService: CoffeeSubmitService,
    private shared: SharedService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // reset origin header
    this.shared.sendCountryFilteredData([{ isCountryUnique: false }]);
    this.headerCoffeeStats$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((x) => {
      this.coffeeStats.originAmount = x.originAmount;
      this.coffeeStats.brewAttributesAmount = x.brewAttributesAmount;
    });

    this.activatedRoute.queryParams
      .pipe(
        mergeMap((urlProps) => {
          this.isGuest = !!urlProps['id'];
          this.hideSharedIcon = !!urlProps['id'];
          this.hasQueryParams = !!urlProps['id'];

          return this.userProfileService.getUserProfileData(URL.apiUserProfileCoffee, {
            params: { otherUserId: urlProps['id'] },
          });
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (x) => {
          this.shared.sendLoadingSpinnerSignal(false);

          this.coffeeStats.originAmount = x.length;
          this.coffeeStats.brewAttributesAmount = x.reduce((acc, curr) => {
            return acc + curr.coffeeBrew.length;
          }, 0);
          this.header.countryAmount = this.statistics.getAllUniqueCountries(x).length;

          this.avgPerOrigin = this.statistics.getAvgOverallPerOrigin(x);
          this.submitDates = this.statistics.getSubmitDate(x);

          // send data to parent component UserProfile
          const state = this.store.selectSnapshot(HeadingOverviewStatsState);
          this.store.dispatch(
            new SetHeadingOverviewStats(
              this.coffeeStats.originAmount,
              this.header.countryAmount,
              state.archiveAmount,
              this.coffeeStats.brewAttributesAmount
            )
          );
          // set arrays to -1 which means closing all subRows (brew, attributes)
          this.showActionPartSmDefault = Array.from(Array(x.length), (_) => -1);
          this.showActionPartSmFiltered = Array.from(Array(x.length), (_) => -1);
          this.showBrewsNums = this.showAttributesCountryNums = Array.from(Array(x.length), (_) => -1);
          this.showAttributesNums = x.map((item) => item.coffeeAttributes.map((_) => -1));

          // modifying main object variable for sorting purpose
          this.coffeeJson = x.map((y, i: number) => ({
            ...y,
            roastingType: { type: y.roastingType, index: this.getRoastingIndex(y.roastingType) },
            avgRating: this.avgPerOrigin[i],
            formSubmitDate: this.submitDates[i],
            coffeeBrew: y.coffeeBrew.map((z, j) => ({
              ...z,
              overall: y.coffeeAttributes[j] && y.coffeeAttributes[j].overall,
            })),
            coffeeAttributes: y.coffeeAttributes.map((z, j) => ({
              ...z,
              brewSubmitDate: y.coffeeBrew[j] && y.coffeeBrew[j].brewSubmitDate,
            })),
          }));

          // setting defaultCoffee for filtering and immutable
          this.coffeeJson = this.coffeeJson.sort(
            this.shared.compareDate('originSubmitDate', OrderTypeEnum.DESC)
          );
          this.coffeeJsonDefault = this.coffeeJson;
          this.coffeeJsonImmutable = x;
          this.uniqueCountries = this.statistics.getAllUniqueCountries(x);
        },
        (err) => {}
      );
  }

  onConfirmCoffeeEdit(): void {
    const originState = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    const metaState = this.store.selectSnapshot(CoffeeMetaDataState);

    this.coffeeSubmitService
      .updateCoffeeOriginData(URL.apiCoffeeOriginUpdate, {
        roastingType: originState.roastingType,
        processingType: originState.processType,
        originSubmitDate: getCurrentDateTimeString(),
        productionDate: originState.productionDate,
        manufacturer: originState.manufacturer,
        coffeeOriginId: metaState.originId,
      })
      .subscribe((_) => {
        this.coffeeJson = this.coffeeJson.map((x: any) => {
          if (x._id === metaState.originId) {
            return {
              ...x,
              roastingType: { type: originState.roastingType, index: x.roastingType.index },
              processingType: originState.processType,
              productionDate: originState.productionDate,
              manufacturer: originState.manufacturer,
            };
          }
          return x;
        });
      });
  }

  useCoffee(coffeeJson: any) {
    removeNavbarDropdown();
    this.routeGuardService.canNavigateToForm(true);
    this.resetEntireFormState();
    this.coffeeUseClicked = true;

    // fill origin coffeeState, oyu need to adjust here for elevationFrom, elevationTo
    this.store.dispatch(new SelectCountry(coffeeJson.country));
    this.store.dispatch(new SetRoastingImage(coffeeJson.roastingType));
    this.store.dispatch(new ChooseCoffeeProcess(coffeeJson.processingType));
    this.store.dispatch(new SetManufacturerName(coffeeJson.manufacturer, null));
    this.store.dispatch(new SetProductionDate(coffeeJson.productionDate));

    this.store.dispatch(new SetAppPageId(this.coffeeUseClicked, [coffeeJson], PageId.BrewPage));
    this.store.dispatch(new SetMetaData(this.getOriginId(coffeeJson), null, null));

    this.router.navigate(['/brew']).then((_) => this.shared.scrollToPageTopView());
  }

  archiveCoffee(coffeeHtml: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);

    modalRef.componentInstance.name = 'Archive Coffee';
    modalRef.componentInstance.content = `
    Your coffee will be moved permanently to archive page. You will not be able to use this coffee anymore unless you enter a new one.
    All the coffees data listed at community and charts statistic will not be visible. Are you sure you want to archive your coffee?`;
    modalRef.componentInstance.rightButtonName = 'Archive';
    modalRef.componentInstance.onConfirm = () => {
      this.userProfileService
        .archiveCoffeeData(URL.apiCoffeeArchive, {
          originId: coffeeHtml._id,
        })
        .pipe(
          mergeMap((_) => this.userProfileService.getArchivesLength({})),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          (x) => {
            this.coffeeJson = this.coffeeJson.filter((y: any) => y._id !== coffeeHtml._id);
            // this.coffeeJsonDefault = this.coffeeJson;
            this.coffeeJsonDefault = this.coffeeJsonDefault.filter((y: any) => y._id !== coffeeHtml._id);

            // set header variables for transferring to parent component
            this.header.archiveAmount = x;
            this.header.countryAmount = this.statistics.getAllUniqueCountries(this.coffeeJsonDefault).length;
            this.calculateHeaderStats(this.coffeeJsonDefault);

            // send data to parent component UserProfile
            this.store.dispatch(
              new SetHeadingOverviewStats(
                this.coffeeStats.originAmount,
                this.header.countryAmount,
                this.header.archiveAmount,
                this.coffeeStats.brewAttributesAmount
              )
            );
            if (!this.coffeeJson.length) {
              this.router.navigate(['profile']).then((_) => this.shared.scrollToPageTopView());
            }
          },
          (err) => {}
        );
    };
  }

  editOrigin(item: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.showEditOrigin = true;
    modalRef.componentInstance.extraParam = {
      originId: item._id,
      roastingType: item.roastingType,
      processingType: item.processingType,
      productionDate: item.productionDate,
      manufacturer: item.manufacturer,
      country: item.country,
      originSubmitDate: item.originSubmitDate,
    };

    modalRef.componentInstance.name = 'Edit Origin';
    modalRef.componentInstance.content = '';
    modalRef.componentInstance.rightButtonName = 'Update';
    modalRef.componentInstance.onConfirm = () => this.onConfirmCoffeeEdit();
  }

  openModalCommentSection(country: string, formSubmitDate: string, attrObj: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.showEditOrigin = false;

    modalRef.componentInstance.name = 'Comments';
    modalRef.componentInstance.content =
      country + ', ' + formSubmitDate + ', <p></p><strong>Comment:</strong><p></p> ' + attrObj.commentText;
    modalRef.componentInstance.rightButtonName = 'Close';
    modalRef.componentInstance.onConfirm = () => {};
  }

  // other useful methods
  // Use enums
  getRoastingIndex(roastingType): number {
    let index = 0;
    switch (roastingType) {
      case 'light':
        index = 1;
        break;
      case 'medium':
        index = 2;
        break;
      case 'dark':
        index = 3;
        break;
      default:
        index = -1;
        break;
    }
    return index;
  }

  getOriginId(x): string {
    return x._id;
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
    this.store.dispatch(
      new SetFlavour({ fruity: false, nutty: false, choco: false, caramel: false, floral: false })
    );
    this.store.dispatch(new SetCommentTextArea(''));

    this.store.dispatch(new SetAppPageId(false, [], null));
  }

  filterDefault() {
    this.coffeeJson = this.coffeeJsonDefault;
    this.calculateHeaderStats(this.coffeeJson);
  }

  filterByGrinding(grindType: string) {
    this.selectedFilter = grindType;
    this.coffeeJson = this.coffeeJsonDefault
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.grindType === grindType),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, grindType: x.coffeeBrew[j].grindType };
          })
          .filter((y) => y.grindType === grindType),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);
    this.calculateHeaderStats(this.coffeeJson);
  }

  filterByRatio(lowerBound: number, higherBound: number) {
    this.selectedFilter = lowerBound.toString() + '-' + higherBound.toString();
    this.coffeeJson = this.coffeeJsonDefault
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.ratio.ratio >= lowerBound && y.ratio.ratio <= higherBound),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, ratio: x.coffeeBrew[j].ratio.ratio };
          })
          .filter((y) => y.ratio >= lowerBound && y.ratio <= higherBound),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);
    this.calculateHeaderStats(this.coffeeJson);
  }

  calculateHeaderStats(coffeeJson: any[]) {
    this.coffeeStats.brewAttributesAmount = coffeeJson.reduce((acc, curr) => {
      return acc + curr.coffeeBrew.length;
    }, 0);
    this.coffeeStats.originAmount = coffeeJson.length;
  }

  onCountryNameChange(name) {
    this.countryFilter = name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
