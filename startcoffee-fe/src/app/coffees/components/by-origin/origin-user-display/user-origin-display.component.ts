import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCoffeesUsersState } from 'src/app/coffees/states/coffees-data.action';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { CoffeesService } from 'src/app/coffees/services/coffees.service';
import { filter, takeUntil } from 'rxjs/operators';
import { SetFiltratedUsers } from 'src/app/coffees/states/filtrated-users.action';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StatisticsCoffeeService } from 'src/app/coffees/services/statistics-coffee.service';
import { UserDisplayService } from '../../shared/user-display/user-display.service';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-user-origin-display',
  templateUrl: './user-origin-display.component.html',
})
export class UserOriginDisplayComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  selectedCountry: string;
  selectedBrew: string;

  filteredCoffeesImmutable: any;
  users: string[];

  coffeesHtmlView: any;
  coffeesHtmlViewDefault: any;

  isUserSearchBoxClicked = false;

  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;

  constructor(
    private userDisplayService: UserDisplayService,
    private coffeeService: CoffeesService,
    private statsCoffee: StatisticsCoffeeService,
    private router: Router,
    private store: Store,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.coffeeService
      .waitForStoreToFill(this.coffees$)
      .pipe(
        filter((x) => !!x.selBrew),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((x: any) => {
        // set header variables
        this.selectedCountry = x.selCountry;
        this.selectedBrew = x.selBrew;

        /*  
        only filters data with criteria 
        selectedCountry,
        selectedBrew
      */
        this.users = x.users.map((x) => x.username).filter((x) => !!x);
        const filteredCoffeesWithoutUsers = this.userDisplayService.filterBySelCountryBrewMethod(
          x.coffees,
          this.selectedCountry,
          this.selectedBrew
        );

        // reference variable to be used in next steps
        this.filteredCoffeesImmutable = this.userDisplayService.addUsernameToFilteredCoffees(
          x.users,
          filteredCoffeesWithoutUsers
        );

        // html view variables
        const htmlView = {
          totalCoffees: this.statsCoffee.getTotalCoffeesPerUser(this.filteredCoffeesImmutable),
          totalBrews: this.statsCoffee.getTotalBrewsAttributesPerUser(this.filteredCoffeesImmutable),
          avgOverall: this.statsCoffee.getAvgOverallPerUser(this.filteredCoffeesImmutable),
          lastSubmittedCoffee: this.statsCoffee.groupByOriginDatePerUser(this.filteredCoffeesImmutable),
        };

        this.coffeesHtmlViewDefault = htmlView.totalCoffees.map((y, j) => ({
          id: y.id,
          username: y.username,
          totalCoffees: htmlView.totalCoffees[j],
          totalBrews: htmlView.totalBrews[j],
          avgOverall: htmlView.avgOverall[j],
          lastSubmittedCoffee: htmlView.lastSubmittedCoffee[j],
        }));
        this.users = this.users.filter((x) => this.coffeesHtmlViewDefault.some((obj) => obj.username === x));

        this.coffeesHtmlView = [...this.coffeesHtmlViewDefault];
      });
  }

  onUser(user: string) {
    /* send here initially filtered list with filter on username, remove else */
    removeNavbarDropdown();
    const userCoffeesList = this.filteredCoffeesImmutable.filter((x) => x.username === user);
    const userId = userCoffeesList[0].id;
    if (userId) {
      this.store.dispatch(
        new SetFiltratedUsers(userId, userCoffeesList, this.selectedCountry, this.selectedBrew)
      );
      this.router.navigate(['coffees/selecteduser']).then((_) => this.shared.scrollToPageTopView());
    } else {
      alert('Cannot navigate to user profile');
    }
  }

  onUserSearchBoxChange(username) {
    this.isUserSearchBoxClicked = true;
    this.coffeesHtmlView = this.coffeesHtmlViewDefault.filter((x) => x.username === username);
  }

  // navigate back
  navigateToCountryDisplay() {
    removeNavbarDropdown();
    this.router.navigate(['coffees']).then((_) => this.shared.scrollToPageTopView());
  }

  navigateToBrewDisplay() {
    removeNavbarDropdown();
    this.router.navigate(['coffees/originbrewlist']).then((_) => this.shared.scrollToPageTopView());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
