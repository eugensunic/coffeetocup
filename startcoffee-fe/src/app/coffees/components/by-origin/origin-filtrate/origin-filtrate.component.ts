import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { Store, Select } from '@ngxs/store';
import { AllCoffeesUsersState, SetAllCoffeesUsersOrigin } from 'src/app/coffees/states/coffees-data.action';
import { CoffeesService } from 'src/app/coffees/services/coffees.service';
import { SetHeadingColor } from 'src/app/coffees/states/highlight-heading.action';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-origin-filtrate',
  templateUrl: './origin-filtrate.component.html',
})
export class OriginFiltrateComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  selectedCountry;
  countryFilter = '';
  allUsers: any;
  coffeeJson: any;

  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;

  coffeesHtmlView: any;

  constructor(
    private statsProfile: StatisticsService,
    private coffeeService: CoffeesService,
    private store: Store,
    private router: Router,
    private shared: SharedService
  ) {}

  ngOnInit() {
    // setTimeout because of an error
    setTimeout((_) => this.store.dispatch(new SetHeadingColor(true, true, false, true)));
    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x: any) => {
        this.allUsers = x.users;
        this.coffeeJson = x.coffees;
        this.selectedCountry = x.selCountry;

        const htmlView = {
          countries: this.statsProfile.getAllUniqueCountries(this.coffeeJson),
          totalCoffee: this.statsProfile.getTotalCoffeesPerCountry(this.coffeeJson),
          totalBrew: this.statsProfile.getTotalBrewsAttributesPerCountry(this.coffeeJson),
          flavor: this.statsProfile.getFlavoursPerCountry(this.coffeeJson),
          date: this.statsProfile.groupByOriginSubmitDate(this.coffeeJson),
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

  navigateOnClick(country: string) {
    removeNavbarDropdown();
    this.selectedCountry = country;
    this.store.dispatch(
      new SetAllCoffeesUsersOrigin(this.coffeeJson, this.allUsers, this.selectedCountry, null)
    );

    this.router.navigate(['coffees/originbrewlist']).then((_) => this.shared.scrollToPageTopView());
  }

  onCountryNameChange(name) {
    this.countryFilter = name;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
