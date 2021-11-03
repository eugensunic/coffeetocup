import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserProfileService } from '../../services/user-profile.service';
import { StatisticsService } from '../../services/statistics.service';
import { ChartStatisticService } from '../../services/chart-statistic.service';
import { takeUntil } from 'rxjs/operators';
import { URL } from '../../../../environments/url';
import {
  HeadingOverviewStatsState,
  SetHeadingOverviewStats,
} from '../../states/heading-overview-stats.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-user-chart-profile',
  templateUrl: './user-chart-profile.component.html',
})
export class UserChartProfileComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  isGuest = false;
  uniqueCountries = [];
  coffeeJson: any;

  coffeeStats = { originAmount: null, brewAttributesAmount: null };
  header = { countryAmount: null, archiveAmount: null };

  constructor(
    private userProfileService: UserProfileService,
    private shared: SharedService,
    public statistics: StatisticsService,
    public chart: ChartStatisticService,
    private store: Store
  ) {}

  ngOnInit() {
    this.userProfileService
      .getUserProfileData(URL.apiUserProfileCoffee, { params: { otherUserId: undefined } })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.shared.sendLoadingSpinnerSignal(false);
          this.coffeeJson = x;
          this.uniqueCountries = this.statistics.getAllUniqueCountries(x);

          this.coffeeStats.originAmount = x.length;
          this.coffeeStats.brewAttributesAmount = x.reduce((acc, curr) => {
            return acc + curr.coffeeBrew.length;
          }, 0);
          this.header.countryAmount = this.statistics.getAllUniqueCountries(x).length;

          const state = this.store.selectSnapshot(HeadingOverviewStatsState);
          this.store.dispatch(
            new SetHeadingOverviewStats(
              this.coffeeStats.originAmount,
              this.header.countryAmount,
              state.archiveAmount,
              this.coffeeStats.brewAttributesAmount
            )
          );
        },
        (err) => {}
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
