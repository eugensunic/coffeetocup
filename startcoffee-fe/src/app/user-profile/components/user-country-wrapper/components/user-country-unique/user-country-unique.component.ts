import { URL } from '../../../../../../environments/url';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { UserProfileService } from '../../../../services/user-profile.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RouteGuardService } from '../../../../../pour-over-form/services/route-guard.service';
import { DateTimePickerService } from '../../../../../shared/services/date-time-picker.service';
import { StatisticsService } from '../../../../services/statistics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoffeeSubmitService } from '../../../../../pour-over-form/services/coffee-submit.service';
import { CoffeeOriginStates } from '../../../../../pour-over-form/components/coffee-origin-input/states/combined.states';
import { CoffeeMetaDataState, SetMetaData } from '../../../../../states/coffee-meta-data.action';
import { getCurrentDateTimeString, removeNavbarDropdown } from '../../../../../utils';
// tslint:disable-next-line:max-line-length
import {
  SelectCountry,
  PopulateCountryList,
} from '../../../../../pour-over-form/components/coffee-origin-input/states/country-name.action';
import { SetRoastingImage } from '../../../../../pour-over-form/components/coffee-origin-input/states/roasting-image.action';
import { ChooseCoffeeProcess } from '../../../../../pour-over-form/components/coffee-origin-input/states/coffee-process.action';
import { SetManufacturerName } from '../../../../../pour-over-form/components/coffee-origin-input/states/coffee-manufacturer';
import { SetProductionDate } from '../../../../../pour-over-form/components/coffee-origin-input/states/coffee-production-date.action';
import { SetAppPageId } from '../../../../../states/page-meta-data-action';
import { PageId } from '../../../../../pour-over-form/models/page-id.enum';
import { NgbdModalComponent } from '../../../../../shared/components/ngbd-modal/ngbd-modal.component';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { SetBrewTime } from '../../../../../pour-over-form/components/brewing-process-input/states/brewing-time.action';
import { SetBrewMethod } from '../../../../../pour-over-form/components/brewing-process-input/states/brew-method.action';
import { SetGrindingType } from '../../../../../pour-over-form/components/brewing-process-input/states/grind-type.action';
import { SetCoffeeWaterRatio } from '../../../../../pour-over-form/components/brewing-process-input/states/coffee-water-ration.action';
import { SetAttributes } from '../../../../../pour-over-form/components/coffee-attributes-input/states/attributes.action';
import { SetFlavour } from '../../../../../pour-over-form/components/coffee-attributes-input/states/flavour.action';
import { SetCommentTextArea } from '../../../../../pour-over-form/states/comment-area.state';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  SetHeadingOverviewStats,
  HeadingOverviewStatsState,
} from 'src/app/user-profile/states/heading-overview-stats.action';
import {
  ProfileCoffeesDataState,
  SetProfileCoffeesData,
} from 'src/app/user-profile/states/user-profile-data.action';
@Component({
  selector: 'app-user-country-unique',
  templateUrl: './user-country-unique.component.html',
})
export class UserCountryUniqueComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  isGuest = false;

  coffeeJson: any;
  coffeeAttributes: any;

  showAttributesNums = [];
  showBrewsNums = [];

  showActionPartSmDefault = [];

  coffeeUseClicked = false;
  coffeeStats = { originAmount: null, brewAttributesAmount: null };
  header = { countryAmount: null, archiveAmount: null };

  constructor(
    private userProfileService: UserProfileService,
    private shared: SharedService,
    private router: Router,
    private store: Store,
    private routeGuardService: RouteGuardService,
    private dateTimePickerService: DateTimePickerService,
    public statistics: StatisticsService,
    private modalService: NgbModal,
    private coffeeSubmitService: CoffeeSubmitService,
    private appRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.userProfileService
      .getUniqueCountryData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        // setTimeout because of an error when angular loads component
        setTimeout(() => {
          this.shared.sendLoadingSpinnerSignal(false);
        });
        this.shared.sendCountryFilteredData([...x, { isCountryUnique: true }]);
        this.coffeeJson = x;
        this.showActionPartSmDefault = Array.from(Array(this.coffeeJson.length), (_) => -1);
        this.showAttributesNums = this.coffeeJson.map((item) => item.coffeeAttributes.map((_) => -1));
      });
  }

  onConfirmCoffeeEdit(): void {
    const originState = this.store.selectSnapshot(CoffeeOriginStates.inputFormOrigin);
    const metaState = this.store.selectSnapshot(CoffeeMetaDataState);

    this.coffeeSubmitService
      .updateCoffeeOriginData(URL.apiCoffeeOriginUpdate, {
        roastingType: originState.roastingType,
        processingType: originState.processType,
        manufacturer: originState.manufacturer,
        originSubmitDate: getCurrentDateTimeString(),
        productionDate: originState.productionDate,
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
    this.store.dispatch(new SetRoastingImage(coffeeJson.roastingType.type));
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
            const profileCoffeeState = this.store.selectSnapshot(ProfileCoffeesDataState).profileCoffees;
            // update profile
            const newProfileCoffees = profileCoffeeState.filter((x) => x._id !== coffeeHtml._id);
            this.store.dispatch(new SetProfileCoffeesData(newProfileCoffees));

            // retrieve updated state
            const profileCoffeeState2 = this.store.selectSnapshot(ProfileCoffeesDataState).profileCoffees;
            const headerState = this.store.selectSnapshot(HeadingOverviewStatsState);

            // calculations
            // archive
            this.header.archiveAmount = x;

            // countries header
            let countries = profileCoffeeState2;
            const countriesAmount = this.statistics.getAllUniqueCountries(countries).length;
            this.header.countryAmount = countriesAmount;

            // brews
            this.coffeeStats.brewAttributesAmount = this.coffeeJson
              .filter((y) => y._id === coffeeHtml._id)
              .reduce((acc, curr) => {
                return acc + curr.coffeeBrew.length;
              }, 0);

            // send data to parent component UserProfile
            this.store.dispatch(
              new SetHeadingOverviewStats(
                headerState.originAmount - 1,
                this.header.countryAmount,
                this.header.archiveAmount,
                headerState.brewAttributesAmount - this.coffeeStats.brewAttributesAmount
              )
            );
            // set new coffeeJson for html view
            this.coffeeJson = this.coffeeJson.filter((y: any) => y._id !== coffeeHtml._id);

            // change state of country data by emitting newly filtered coffee_json data
            this.userProfileService.transferUniqueCountryData(this.coffeeJson);

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

  // used in html view
  openModalCommentSection(country: string, formSubmitDate: string, attrObj: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.showEditOrigin = false;

    modalRef.componentInstance.name = 'Comments';
    modalRef.componentInstance.content =
      country + ', ' + formSubmitDate + ', <p></p><strong>Comment:</strong><p></p> ' + attrObj.commentText;
    modalRef.componentInstance.rightButtonName = 'Close';
    modalRef.componentInstance.onConfirm = () => {};
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
