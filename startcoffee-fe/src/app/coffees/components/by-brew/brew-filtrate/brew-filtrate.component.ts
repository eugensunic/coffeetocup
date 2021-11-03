import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { AllCoffeesUsersStateBrew, SetAllCoffeesUsersBrew } from 'src/app/coffees/states/coffees-data.action';
import { CoffeeBrewFilterModel } from 'src/app/coffees/models/coffee-brew-filter.model';
import { StatisticsCoffeeService } from 'src/app/coffees/services/statistics-coffee.service';
import { CoffeesService } from 'src/app/coffees/services/coffees.service';
import { SetHeadingColor } from 'src/app/coffees/states/highlight-heading.action';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { removeNavbarDropdown } from 'src/app/utils';
@Component({
  selector: 'app-brew-filtrate',
  templateUrl: './brew-filtrate.component.html',
})
export class BrewFiltrateComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  allBrewMethods = ['Hario V60', 'Chemex', 'Flat bottom dripper', 'Other methods'];

  selectedBrew;

  allUsers: any;
  coffeeJson: any;

  @Select(AllCoffeesUsersStateBrew)
  coffees$: Observable<any>;

  // display lists in html view
  byBrewList: CoffeeBrewFilterModel;

  constructor(
    private statsCoffee: StatisticsCoffeeService,
    private coffeeService: CoffeesService,
    private shared: SharedService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    // setTimeout because of an error
    setTimeout((_) => this.store.dispatch(new SetHeadingColor(false, true, true, true)));
    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        this.allUsers = x.users;
        this.coffeeJson = x.coffees;
        this.byBrewList = {
          brewMethod: this.allBrewMethods.sort(),
          totalCoffees: this.statsCoffee
            .getTotalCountriesPerBrew(this.coffeeJson)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
          totalBrews: this.statsCoffee
            .getTotalBrewsAttributesPerBrew1(this.coffeeJson)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
          avgCoffeeAmount: this.statsCoffee
            .getAvgAmountPropPerBrew(this.coffeeJson, 'coffeeNumerator')
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC))
            .map((x) => {
              if (x.avgcoffeeNumerator) {
                return { ...x, avgcoffeeNumerator: Number(x.avgcoffeeNumerator).toFixed() + 'g' };
              }
              return x;
            }),
          avgWaterAmount: this.statsCoffee
            .getAvgAmountPropPerBrew(this.coffeeJson, 'waterDenominator')
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC))
            .map((x) => {
              if (x.avgwaterDenominator) {
                return { ...x, avgwaterDenominator: Number(x.avgwaterDenominator).toFixed() + 'g' };
              }
              return x;
            }),
          mostUsedGrind: this.statsCoffee
            .getMostGrindPerBrew(this.coffeeJson)
            .sort(this.shared.compareString('brewMethod', OrderTypeEnum.ASC)),
        };
      });
  }

  // on country name click, 1.table
  navigateOnClick(brewMethod: string) {
    removeNavbarDropdown();
    this.selectedBrew = brewMethod;
    this.store.dispatch(new SetAllCoffeesUsersBrew(this.coffeeJson, this.allUsers, this.selectedBrew, null));
    this.router.navigate(['coffees/brewingoriginlist']).then((_) => this.shared.scrollToPageTopView());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
