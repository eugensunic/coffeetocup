import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCoffeesUsersState, SetAllCoffeesUsersOrigin } from 'src/app/coffees/states/coffees-data.action';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { CoffeesService } from 'src/app/coffees/services/coffees.service';
import { CoffeeBrewFilterModel } from 'src/app/coffees/models/coffee-brew-filter.model';
import { StatisticsCoffeeService } from 'src/app/coffees/services/statistics-coffee.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-origin-brew-display',
  templateUrl: './origin-brew-display.component.html',
})
export class OriginBrewDisplayComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  allBrewMethods = ['Hario V60', 'Chemex', 'Flat bottom dripper', 'Other methods'];

  selectedBrew;
  selectedCountry;

  byBrewList: CoffeeBrewFilterModel;

  coffeeJson: any;
  allUsers: any;

  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;

  constructor(
    private statsCoffee: StatisticsCoffeeService,
    private shared: SharedService,
    private router: Router,
    private coffeeService: CoffeesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x: any) => {
        this.coffeeJson = x.coffees;
        this.allUsers = x.users;

        this.selectedCountry = x.selCountry;

        // set object list for 2. brew table
        this.byBrewList = {
          brewMethod: this.allBrewMethods.sort(),
          totalCoffees: this.statsCoffee
            .getTotalCountriesPerBrew(this.coffeeJson, this.selectedCountry)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
          totalBrews: this.statsCoffee
            .getTotalBrewsAttributesPerBrew1(this.coffeeJson, this.selectedCountry)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
          avgCoffeeAmount: this.statsCoffee
            .getAvgAmountPropPerBrew(this.coffeeJson, 'coffeeNumerator', this.selectedCountry)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC))
            .map((x) => {
              if (x.avgcoffeeNumerator) {
                return { ...x, avgcoffeeNumerator: Number(x.avgcoffeeNumerator).toFixed() + 'g' };
              }
              return x;
            }),
          avgWaterAmount: this.statsCoffee
            .getAvgAmountPropPerBrew(this.coffeeJson, 'waterDenominator', this.selectedCountry)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC))
            .map((x) => {
              if (x.avgwaterDenominator) {
                return { ...x, avgwaterDenominator: Number(x.avgwaterDenominator).toFixed() + 'g' };
              }
              return x;
            }),
          mostUsedGrind: this.statsCoffee
            .getMostGrindPerBrew(this.coffeeJson, this.selectedCountry)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
        };
      });
  }

  navigateOnClick(brewMethod: string) {
    removeNavbarDropdown();
    this.selectedBrew = brewMethod;
    this.store.dispatch(
      new SetAllCoffeesUsersOrigin(this.coffeeJson, this.allUsers, this.selectedCountry, this.selectedBrew)
    );
    this.router.navigate(['coffees/originbrewuser']).then((_) => this.shared.scrollToPageTopView());
  }

  navigateToCoffees() {
    removeNavbarDropdown();
    this.router.navigate(['coffees']).then((_) => this.shared.scrollToPageTopView());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
