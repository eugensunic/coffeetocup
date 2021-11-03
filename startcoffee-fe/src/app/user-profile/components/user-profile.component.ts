import { SharedService } from '../../shared/services/shared.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject, combineLatest, Observable } from 'rxjs';
import { UserProfileService } from '../services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { RouteGuardService } from '../../pour-over-form/services/route-guard.service';
import { DateTimePickerService } from '../../shared/services/date-time-picker.service';
import { StatisticsService } from '../services/statistics.service';
import { mergeMap, takeUntil, filter } from 'rxjs/operators';
import { SetAppPageId } from '../../states/page-meta-data-action';
import { PageId } from '../../pour-over-form/models/page-id.enum';
import {
  SelectCountry,
  PopulateCountryList,
} from '../../pour-over-form/components/coffee-origin-input/states/country-name.action';
import { SetRoastingImage } from '../../pour-over-form/components/coffee-origin-input/states/roasting-image.action';
import { ChooseCoffeeProcess } from '../../pour-over-form/components/coffee-origin-input/states/coffee-process.action';
import { SetManufacturerName } from '../../pour-over-form/components/coffee-origin-input/states/coffee-manufacturer';
import { SetProductionDate } from '../../pour-over-form/components/coffee-origin-input/states/coffee-production-date.action';
import { SetBrewTime } from '../../pour-over-form/components/brewing-process-input/states/brewing-time.action';
import { SetBrewMethod } from '../../pour-over-form/components/brewing-process-input/states/brew-method.action';
import { SetGrindingType } from '../../pour-over-form/components/brewing-process-input/states/grind-type.action';
import { SetCoffeeWaterRatio } from '../../pour-over-form/components/brewing-process-input/states/coffee-water-ration.action';
import { SetAttributes } from '../../pour-over-form/components/coffee-attributes-input/states/attributes.action';
import { SetFlavour } from '../../pour-over-form/components/coffee-attributes-input/states/flavour.action';
import { SetCommentTextArea } from '../../pour-over-form/states/comment-area.state';
import { URL } from '../../../environments/url';
import { HeadingOverviewStatsState, SetHeadingOverviewStats } from '../states/heading-overview-stats.action';
import { greenTextColor } from 'src/environments/typography';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  @ViewChild('profileCoffeeByCountry') profileCoffeeByCountry;
  @ViewChild('profileAllCoffee') profileAllCoffee;
  @ViewChild('profileCoffeeByCountrySm') profileCoffeeByCountrySm;
  @ViewChild('profileAllCoffeeSm') profileAllCoffeeSm;

  @Select(HeadingOverviewStatsState)
  headerCoffeeStats$: Observable<any>;

  // check if it's a guest page
  isGuest = false;

  coffeeJson: any;
  coffeeAttributes: any;

  showAttributesNums = [];
  showBrewsNums = [];
  showLoadingSpinner = true;

  userObject: any;
  userSettingsObject: any;
  coffeeStats = { originAmount: null, brewAttributesAmount: null, defaultAmount: null };
  header = { countryAmount: null, archiveAmount: null, originName: null, isCountryUnique: false };

  constructor(
    private shared: SharedService,
    private userProfileService: UserProfileService,
    private router: Router,
    private store: Store,
    private routeGuardService: RouteGuardService,
    private dateTimePickerService: DateTimePickerService,
    public statistics: StatisticsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.shared.setBackgroundImage('assets/images/general/profile_background.png');
    this.searchBoxListener();
    this.filteredCountryListener();

    // header overview section listener
    this.headerCoffeeStats$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((x) => {
      this.header.archiveAmount = x.archiveAmount;
      this.header.countryAmount = x.countryAmount;
      this.coffeeStats.originAmount = x.originAmount;
      this.coffeeStats.defaultAmount = this.coffeeStats.originAmount;

      this.coffeeStats.brewAttributesAmount = x.brewAttributesAmount;
    });

    this.shared
      .loadingSpinner()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => (this.showLoadingSpinner = x));

    this.activatedRoute.queryParams.subscribe((urlProps) => {
      combineLatest(
        this.userProfileService.getUserSettingsData(URL.settingsBasic, {
          params: { otherUserId: urlProps['id'] },
        }),
        this.userProfileService.getUserData(URL.userData, { params: { otherUserId: urlProps['id'] } })
      )
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(([j, k]) => {
          if (j) {
            this.userSettingsObject = j
              ? {
                  ...j,
                  country: j.country ? j.country + ', ' : '',
                  city: j.city ? j.city : '',
                }
              : '';
          } else {
            this.userSettingsObject = '';
          }
          this.userObject = k;
        });
    });

    this.activatedRoute.queryParams
      .pipe(
        mergeMap((urlProps) => {
          this.isGuest = !!urlProps['id'];
          return this.userProfileService.getArchivesLength({
            params: { otherUserId: urlProps['id'] },
          });
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((x) => {
        this.header.archiveAmount = x;

        // send data to parent component UserProfile
        const state = this.store.selectSnapshot(HeadingOverviewStatsState);

        this.store.dispatch(
          new SetHeadingOverviewStats(
            state.originAmount,
            state.countryAmount,
            this.header.archiveAmount,
            state.brewAttributesAmount
          )
        );
      });
  }

  ngAfterViewInit() {
    this.applyTextColorToRoute(this.router.url);
  }

  searchBoxListener() {
    // doesn't work properly check it out next time you get into the code.
    this.shared.getSearchUserSignal().subscribe((_) => {
      if (this.coffeeJson) {
        this.coffeeStats.brewAttributesAmount = this.coffeeJson.reduce((acc, curr) => {
          return acc + curr.coffeeBrew.length;
        }, 0);
        this.coffeeStats.originAmount = this.coffeeJson.length;
        this.coffeeStats.defaultAmount = this.coffeeStats.originAmount;
        this.header.countryAmount = this.statistics.getAllUniqueCountries(this.coffeeJson).length;
      }
    });
  }

  filteredCountryListener() {
    this.shared
      .getCountryFilteredData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        setTimeout((_) => {
          this.header.originName = x[0].country;
          this.header.isCountryUnique = x[x.length - 1].isCountryUnique;
        });
        this.coffeeStats.originAmount = x.length - 1;
        this.coffeeStats.brewAttributesAmount = x.reduce((acc, curr) => {
          if (curr.coffeeBrew) {
            return acc + curr.coffeeBrew.length;
          }
          return acc;
        }, 0);
      });
  }

  // buttons: create, use, delete, archive coffee
  createNewCoffee() {
    removeNavbarDropdown();
    this.routeGuardService.canNavigateToForm(true);
    this.resetEntireFormState();
    this.router.navigate(['/origin']);
    this.store.dispatch(new SetAppPageId(false, null, PageId.OriginPage));
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

  navigateToUserArchive() {
    removeNavbarDropdown();
    this.router.navigate(['/archive']);
  }

  navigateToCoffeeDefault() {
    removeNavbarDropdown();
    this.profileCoffeeByCountry.nativeElement.style.color = '';
    this.profileCoffeeByCountry.nativeElement.style.fontWeight = 'normal';

    this.profileAllCoffee.nativeElement.style.color = greenTextColor;
    this.profileAllCoffee.nativeElement.style.fontWeight = 'bold';

    this.profileCoffeeByCountrySm.nativeElement.style.color = '';
    this.profileCoffeeByCountrySm.nativeElement.style.fontWeight = 'normal';

    this.profileAllCoffeeSm.nativeElement.style.color = greenTextColor;
    this.profileAllCoffeeSm.nativeElement.style.fontWeight = 'bold';

    this.router.navigate(['/profile/allcoffees']);
  }

  navigateToCountryProfile() {
    removeNavbarDropdown();
    this.profileCoffeeByCountry.nativeElement.style.color = greenTextColor;
    this.profileCoffeeByCountry.nativeElement.style.fontWeight = 'bold';

    this.profileAllCoffee.nativeElement.style.color = '';
    this.profileAllCoffee.nativeElement.style.fontWeight = 'normal';

    this.profileCoffeeByCountrySm.nativeElement.style.color = greenTextColor;
    this.profileCoffeeByCountrySm.nativeElement.style.fontWeight = 'bold';

    this.profileAllCoffeeSm.nativeElement.style.color = '';
    this.profileAllCoffeeSm.nativeElement.style.fontWeight = 'normal';

    this.router.navigate(['profile']);
  }

  navigateToChartProfile() {
    removeNavbarDropdown();
    this.router.navigate(['profile/chartProfile']);
  }

  applyTextColorToRoute(routeName) {
    switch (routeName) {
      case '/profile/allcoffees':
        this.profileAllCoffee.nativeElement.style.color = greenTextColor;
        this.profileAllCoffeeSm.nativeElement.style.color = greenTextColor;
        this.profileAllCoffee.nativeElement.style.fontWeight = 'bold';
        this.profileAllCoffeeSm.nativeElement.style.fontWeight = 'bold';
        break;
      case '/profile':
        this.profileCoffeeByCountry.nativeElement.style.color = greenTextColor;
        this.profileCoffeeByCountrySm.nativeElement.style.color = greenTextColor;
        this.profileCoffeeByCountry.nativeElement.style.fontWeight = 'bold';
        this.profileCoffeeByCountrySm.nativeElement.style.fontWeight = 'bold';
        break;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
