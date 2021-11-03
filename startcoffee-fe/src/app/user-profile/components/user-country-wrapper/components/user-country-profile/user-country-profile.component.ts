import { URL } from '../../../../../../environments/url';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserProfileService } from '../../../../services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatisticsService } from '../../../../services/statistics.service';
import { SharedService } from '../../../../../shared/services/shared.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { OrderTypeEnum } from '../../../../../shared/models/order-type.enum';
import {
  HeadingOverviewStatsState,
  SetHeadingOverviewStats,
} from 'src/app/user-profile/states/heading-overview-stats.action';
import { Store } from '@ngxs/store';
import { SetProfileCoffeesData } from 'src/app/user-profile/states/user-profile-data.action';
import {
  lightGreenBackgroundColor,
  fruityBarBackgroundColor,
  nuttyBarBackgroundColor,
  chocoBarBackgroundColor,
  caramelBarBackgroundColor,
  floralBarBackgroundColor,
  sortBackgroundColor,
} from 'src/environments/typography';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-user-country-profile',
  templateUrl: './user-country-profile.component.html',
})
export class UserCountryProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  readonly lightGreenBackgroundColor = lightGreenBackgroundColor;

  readonly fruityBarBackgroundColor = fruityBarBackgroundColor;
  readonly nuttyBarBackgroundColor = nuttyBarBackgroundColor;
  readonly chocoBarBackgroundColor = chocoBarBackgroundColor;
  readonly caramelBarBackgroundColor = caramelBarBackgroundColor;
  readonly floralBarBackgroundColor = floralBarBackgroundColor;

  @ViewChild('sortByCountry') sortByCountry;
  @ViewChild('sortByCoffees') sortByCoffees;
  @ViewChild('sortByBrewing') sortByBrewing;
  @ViewChild('sortByRating') sortByRating;
  @ViewChild('sortByDate') sortByDate;

  htmlSortItemsSm: HTMLElement[] = [];

  coffeeJson: any;
  coffeeJsonImmutable: any;
  toggleFlavorsSm = [];
  countryFilter = '';

  // remove and use directly in code
  avgPerOrigin = [];
  submitDates = [];

  showOriginSortingWrapper = false;
  showTotalCoffeesSortingWrapper = false;
  showTotalBrewsSortingWrapper = false;
  showLastBrewingSortingWrapper = false;
  showAvgRatingSortingWrapper = false;

  sortCoffeesAmount = false;
  sortOriginSubmitDateFlag = false;
  sortFilteredCountry = false;
  sortFilteredBrewsAttributes = false;
  sortFilteredAvgOverall = false;

  constructor(
    private userProfileService: UserProfileService,
    private shared: SharedService,
    private router: Router,
    public statistics: StatisticsService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.shared.sendCountryFilteredData([{ isCountryUnique: false }]);
    this.shared.highlightNavHeading('profile');
    this.activatedRoute.queryParams
      .pipe(
        mergeMap((urlProps) =>
          this.userProfileService.getUserProfileData(URL.apiUserProfileCoffee, {
            params: { otherUserId: urlProps['id'] },
          })
        ),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (x) => {
          // save state here and then fetch on unique to calculate th
          this.store.dispatch(new SetProfileCoffeesData(x));
          const brewAttributesAmount = x.reduce((acc, curr) => {
            return acc + curr.coffeeBrew.length;
          }, 0);
          const originAmount = x.length;
          const countryAmount = this.statistics.getAllUniqueCountries(x).length;

          // send data to parent component UserProfile
          const state = this.store.selectSnapshot(HeadingOverviewStatsState);
          this.store.dispatch(
            new SetHeadingOverviewStats(
              originAmount,
              countryAmount,
              state.archiveAmount,
              brewAttributesAmount
            )
          );

          // fill headers and dispatch them to profile component.ts
          this.shared.sendLoadingSpinnerSignal(false);
          this.avgPerOrigin = this.statistics.getAvgOverallPerOrigin(x);
          this.submitDates = this.statistics.getSubmitDate(x);

          // modifying main object variable for sorting purpose
          this.coffeeJson = x.map((y, i: number) => ({
            ...y,
            avgRating: Number.isNaN(parseFloat(this.avgPerOrigin[i])) ? 0 : parseFloat(this.avgPerOrigin[i]),
            formSubmitDate: this.submitDates[i],
            roastingType: { type: y.roastingType, index: 0 },
            coffeeBrew: y.coffeeBrew.map((z, j) => ({
              ...z,
              overall: y.coffeeAttributes[j] && y.coffeeAttributes[j].overall,
            })),
            coffeeAttributes: y.coffeeAttributes.map((z, j) => ({
              ...z,
              brewSubmitDate: y.coffeeBrew[j] && y.coffeeBrew[j].brewSubmitDate,
            })),
          }));

          // need to transfer this data to the other component
          this.coffeeJsonImmutable = [...this.coffeeJson];
          // this.coffeeJson = [...this.coffeeJson].sort(
          //   this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.DESC)
          // );
          this.fillCoffeeByCountry();
          this.lastBrewSubmitDateTimeSort();
        },
        (err) => {}
      );
  }

  ngAfterViewInit() {
    this.htmlSortItemsSm = [
      this.sortByCountry,
      this.sortByCoffees,
      this.sortByBrewing,
      this.sortByRating,
      this.sortByDate,
    ];
  }

  toggleFlavorsDropdownSm(i) {
    this.toggleFlavorsSm[i] = !this.toggleFlavorsSm[i];
  }

  // should only have one iteration, optimize later
  fillCoffeeByCountry() {
    this.coffeeJson = this.statistics.getAllUniqueCountries(this.coffeeJson).map((x, i) => {
      return {
        country: this.statistics.getAllUniqueCountries(this.coffeeJson)[i],
        totalCoffees: this.statistics.getTotalCoffeesPerCountry(this.coffeeJson)[i],
        totalBrewsAttr: this.statistics.getTotalBrewsAttributesPerCountry(this.coffeeJson)[i],
        avgOverall: this.statistics.getAttributeRatingPerCountry(this.coffeeJson, 'overall')[i],
        originSubmitDate: this.statistics.groupByOriginSubmitDate(this.coffeeJson)[i],
        flavors: this.statistics.getFlavoursPerCountry(this.coffeeJson)[i],
        lastBrewSubmitDateTime: this.statistics.groupByLastBrewSubmitDateTime(this.coffeeJson)[i],
      };
    });
    this.sortOriginSubmitDateFlag = true;
    // this.lastBrewSubmitDateTimeSort();
  }

  // Sort inner table by clicking on header cell name BEGIN, order respective to html
  sortCountry() {
    this.showOriginSortingWrapper = true;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = false;
    this.showLastBrewingSortingWrapper = false;
    this.showAvgRatingSortingWrapper = false;
    this.shared.applyBackgroundColorOnClick(
      this.htmlSortItemsSm,
      sortBackgroundColor,
      null,
      null,
      null,
      null
    );
    if ((this.sortFilteredCountry = !this.sortFilteredCountry)) {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareString('country', OrderTypeEnum.ASC));
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareString('country', OrderTypeEnum.DESC));
    }
  }

  sortCoffees() {
    this.showOriginSortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = true;
    this.showTotalBrewsSortingWrapper = false;
    this.showLastBrewingSortingWrapper = false;
    this.showAvgRatingSortingWrapper = false;
    this.shared.applyBackgroundColorOnClick(
      this.htmlSortItemsSm,
      null,
      sortBackgroundColor,
      null,
      null,
      null
    );
    if ((this.sortCoffeesAmount = !this.sortCoffeesAmount)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('totalCoffees', 'amount', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('totalCoffees', 'amount', OrderTypeEnum.DESC)
      );
    }
  }

  sortTotalBrewsAttributes() {
    this.showOriginSortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = true;
    this.showLastBrewingSortingWrapper = false;
    this.showAvgRatingSortingWrapper = false;
    this.shared.applyBackgroundColorOnClick(
      this.htmlSortItemsSm,
      null,
      null,
      sortBackgroundColor,
      null,
      null
    );
    if ((this.sortFilteredBrewsAttributes = !this.sortFilteredBrewsAttributes)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('totalBrewsAttr', 'amount', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('totalBrewsAttr', 'amount', OrderTypeEnum.DESC)
      );
    }
  }

  sortAvgOverallRating() {
    this.showOriginSortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = false;
    this.showLastBrewingSortingWrapper = false;
    this.showAvgRatingSortingWrapper = true;
    this.shared.applyBackgroundColorOnClick(
      this.htmlSortItemsSm,
      null,
      null,
      null,
      sortBackgroundColor,
      null
    );
    if ((this.sortFilteredAvgOverall = !this.sortFilteredAvgOverall)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('avgOverall', 'avg', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareNum2('avgOverall', 'avg', OrderTypeEnum.DESC)
      );
    }
  }

  // Sort inner table by clicking on header cell name END
  lastBrewSubmitDateTimeSort() {
    this.showOriginSortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = false;
    this.showLastBrewingSortingWrapper = true;
    this.showAvgRatingSortingWrapper = false;
    this.shared.applyBackgroundColorOnClick(
      this.htmlSortItemsSm,
      null,
      null,
      null,
      null,
      sortBackgroundColor
    );
    if ((this.sortOriginSubmitDateFlag = !this.sortOriginSubmitDateFlag)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.DESC)
      );
    }
  }

  navigateToUniqueCountryProfile(country: string) {
    removeNavbarDropdown();
    this.userProfileService.transferUniqueCountryData(
      this.statistics.filterCoffeesByCountry(this.coffeeJsonImmutable, country)
    );
    this.router.navigate(['profile/selectedorigin']).then((_) => {
      if (window.innerWidth < 768) {
        setTimeout((_) => {
          const element = document.querySelector('#selected-origin-wrapper');
          element.scrollIntoView();
        }, 10);
      }
    });
  }

  onCountryNameChange(name) {
    this.countryFilter = name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
