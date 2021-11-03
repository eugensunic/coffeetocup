import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { ChartStatisticService } from 'src/app/user-profile/services/chart-statistic.service';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AllCoffeesUsersState } from '../../states/coffees-data.action';
import { CoffeesService } from '../../services/coffees.service';
import { SetHeadingColor } from '../../states/highlight-heading.action';

@Component({
  selector: 'app-coffee-chart',
  templateUrl: './coffee-chart.component.html',
})
export class CoffeeChartComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;
  uniqueCountries = [];

  coffeeJson: any;

  constructor(
    private coffeeService: CoffeesService,
    private shared: SharedService,
    public statistics: StatisticsService,
    public chart: ChartStatisticService,
    private store: Store
  ) {}

  ngOnInit() {
    setTimeout((_) => this.store.dispatch(new SetHeadingColor(false, false, true, false)));

    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.shared.sendLoadingSpinnerSignal(false);
          this.coffeeJson = x.coffees;

          this.uniqueCountries = this.statistics.getAllUniqueCountries(this.coffeeJson);
        },
        (err) => {}
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
