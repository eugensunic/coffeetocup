import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AllCoffeesUsersStateBrew, SetAllCoffeesUsersBrew } from 'src/app/coffees/states/coffees-data.action';
import { Observable, Subject } from 'rxjs';
import { CoffeesService } from 'src/app/coffees/services/coffees.service';
import { StatisticsCoffeeService } from 'src/app/coffees/services/statistics-coffee.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SharedService } from 'src/app/shared/services/shared.service';
import { removeNavbarDropdown } from 'src/app/utils';
@Component({
  selector: 'app-country-display',
  templateUrl: './country-display.component.html',
})
export class CountryDisplayComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  countryFilter = '';

  @ViewChild('sortByOrigin') sortByOrigin;
  @ViewChild('sortByCoffee') sortByCoffee;
  @ViewChild('sortByBrewing') sortByBrewing;
  @ViewChild('sortByDate') sortByDate;

  htmlSortItemsSm: HTMLElement[] = [];

  selectedCountry;
  selectedBrew;

  allUsers: any;
  coffeeJson: any;

  @Select(AllCoffeesUsersStateBrew)
  coffees$: Observable<any>;

  // display lists in html view
  coffeesHtmlView: any;

  constructor(
    private shared: SharedService,
    private coffeeService: CoffeesService,
    private statsCoffee: StatisticsCoffeeService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x: any) => {
        this.coffeeJson = x.coffees;
        this.allUsers = x.users;
        this.selectedBrew = x.selBrew;
        this.selectedCountry = x.selCountry;

        const htmlView = {
          countries: this.statsCoffee.getAllUniqueCountriesPerCountry(this.coffeeJson, this.selectedBrew),
          totalCoffee: this.statsCoffee.getTotalCoffeesPerCountry(this.coffeeJson, this.selectedBrew),
          totalBrew: this.statsCoffee.getTotalBrewsAttributesPerCountry(this.coffeeJson, this.selectedBrew),
          flavor: this.statsCoffee.getFlavoursPerCountry(this.coffeeJson, this.selectedBrew),
          date: this.statsCoffee.groupByOriginSubmitDatePerCountry(this.coffeeJson, this.selectedBrew),
        };

        this.coffeesHtmlView = htmlView.countries.map((item, i) => ({
          country: item,
          totalCoffee: htmlView.totalCoffee[i],
          totalBrew: htmlView.totalBrew[i],
          flavor: htmlView.flavor[i],
          date: htmlView.date[i],
        }));
      });
  }

  // on country name click, 2.table
  navigateOnClick(country: string) {
    removeNavbarDropdown();
    this.selectedCountry = country;
    this.store.dispatch(
      new SetAllCoffeesUsersBrew(this.coffeeJson, this.allUsers, this.selectedBrew, this.selectedCountry)
    );

    this.router.navigate(['coffees/breworiginuser']).then((_) => this.shared.scrollToPageTopView());
  }

  // first table
  navigateToCoffeesBrewFilter() {
    removeNavbarDropdown();
    this.router.navigate(['coffees/bybrewing']).then((_) => this.shared.scrollToPageTopView());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
