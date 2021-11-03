import { CoffeesService } from './services/coffees.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { URL } from '../../environments/url';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import {
  SetAllCoffeesUsersOrigin,
  SetAllCoffeesUsersBrew,
  AllCoffeesUsersState,
} from './states/coffees-data.action';
import { SetHeadingColor, HeadingColorState } from './states/highlight-heading.action';
import { SharedService } from '../shared/services/shared.service';
import { removeNavbarDropdown } from '../utils';
@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
})
export class CoffeesComponent implements OnInit {
  @Select(HeadingColorState)
  headingColor$: Observable<any>;
  showLoadingSpinner = true;

  isOriginHeading = false;
  isBrewHeading = false;
  isOriginHeadingVisible = true;
  isBrewHeadingVisible = true;

  constructor(
    private coffeeService: CoffeesService,
    private router: Router,
    private store: Store,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.shared.highlightNavHeading('coffees');
    this.headingColor$.subscribe((x) => {
      this.isOriginHeading = x.isOriginHeading;
      this.isBrewHeading = x.isBrewHeading;
      this.isOriginHeadingVisible = x.isOriginHeadingVisible;
      this.isBrewHeadingVisible = x.isBrewHeadingVisible;
    });

    combineLatest([
      this.coffeeService.getAllUsersMetaData(URL.apiCoffeesUsers),
      this.coffeeService.getAllUsersCoffeeData(URL.apiCoffeesUserData),
    ]).subscribe(
      ([users, coffees]) => {
        this.showLoadingSpinner = false;
        this.store.dispatch(new SetAllCoffeesUsersOrigin(coffees, users, null, null));
        this.store.dispatch(new SetAllCoffeesUsersBrew(coffees, users, null, null));
      },
      (_) => (this.showLoadingSpinner = false)
    );
  }

  navigateToOrigin() {
    removeNavbarDropdown();
    this.store.dispatch(new SetHeadingColor(true, true, false, true));
    this.router.navigate(['/coffees']).then((_) => this.shared.scrollToPageTopView());
  }

  navigateToBrew() {
    removeNavbarDropdown();
    this.store.dispatch(new SetHeadingColor(false, true, true, true));
    this.router.navigate(['/coffees/bybrewing']).then((_) => this.shared.scrollToPageTopView());
  }

  navigateToCharts() {
    this.router.navigate(['/coffees/charts']).then((_) => this.shared.scrollToPageTopView());
  }
}
