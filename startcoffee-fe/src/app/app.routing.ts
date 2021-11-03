import { CoffeesComponent } from './coffees/coffees.component';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { UserChartProfileComponent } from './user-profile/components/user-chart-profile/user-chart-profile.component';
import { UserDefaultProfileComponent } from './user-profile/components/user-default-profile/user-default-profile.component';
import { GeneralStatisticsComponent } from './community/components/general-statistics/general-statistics.component';
import { PourOverFormComponent } from './pour-over-form/components/pour-over-form.component';
import { UserProfileComponent } from './user-profile/components/user-profile.component';
import { Routes, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSettingsComponent } from 'src/app/user-settings/components/user-settings.component';

import { ChangePasswordComponent } from './core-global-elements/components/change-password/change-password.component';
import { RouteGuardService } from './pour-over-form/services/route-guard.service';
import { CoffeeOriginComponent } from './pour-over-form/components/coffee-origin-input/coffee-origin.component';
import { BrewingProcessComponent } from './pour-over-form/components/brewing-process-input/brewing-process.component';
import { CoffeeAttributeComponent } from './pour-over-form/components/coffee-attributes-input/coffee-attribute.component';
import { CommunityComponent } from './community/components/community.component';
import { MostBrewsAddedComponent } from './community/components/most-brews-added/most-brews-added.component';
import { MostCoffeesAddedComponent } from './community/components/most-coffees-added/most-coffees-added.component';
import { UserCountryWrapperComponent } from './user-profile/components/user-country-wrapper/user-country-wrapper.component';
// tslint:disable-next-line:max-line-length
import { UserCountryProfileComponent } from './user-profile/components/user-country-wrapper/components/user-country-profile/user-country-profile.component';
// tslint:disable-next-line:max-line-length
import { UserCountryUniqueComponent } from './user-profile/components/user-country-wrapper/components/user-country-unique/user-country-unique.component';
import { map } from 'rxjs/operators';

import { AllCoffeesUsersState, AllCoffeesUsersStateBrew } from './coffees/states/coffees-data.action';
import { Select } from '@ngxs/store';
import { FiltratedUsersState } from './coffees/states/filtrated-users.action';
import { ErrorPageComponent } from './core-global-elements/components/error-page/error-page.component';
import { SharedCoffeeStatisticsComponent } from './shared-coffee-statistics/shared-coffee-statistics.component';

/* Routing is not modularized. We want to see routes in one place. This file represents the entire routing structure
 of the application. */

@Injectable()
export class CanActivateForm implements CanActivate {
  constructor(private routeGuardService: RouteGuardService, private router: Router) {}
  canActivate(): Observable<boolean> {
    if (this.router.routerState.snapshot.url === '') {
      this.router.navigate(['/profile']);
    }
    return this.routeGuardService.shouldNavigateToForm();
  }
}
@Injectable()
export class CanActivateUniqueCountry implements CanActivate {
  constructor(private userProfileService: UserProfileService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.userProfileService.getUniqueCountryData().pipe(
      map((x) => {
        if (x.length === 0) {
          this.router.navigate(['profile']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
// it's wrongly done, should redo the logic
@Injectable()
export class CanActivateCoffees implements CanActivate {
  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.coffees$.pipe(
      map((x) => {
        if (!x.coffee) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
@Injectable()
export class CanActivateCoffeesByOrigin implements CanActivate {
  @Select(AllCoffeesUsersState)
  coffees$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.coffees$.pipe(
      map((x) => {
        if (!x.selCountry) {
          this.router.navigate(['coffees/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
@Injectable()
export class CanActivateCoffeesByBrew implements CanActivate {
  @Select(AllCoffeesUsersStateBrew)
  coffees$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.coffees$.pipe(
      map((x) => {
        if (!x.selBrew) {
          this.router.navigate(['coffees/bybrewing']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
@Injectable()
export class CanActivateCoffeesUsersFiltered implements CanActivate {
  @Select(FiltratedUsersState)
  coffees$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.coffees$.pipe(
      map((x) => {
        if (!x.users) {
          this.router.navigate(['coffees']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pour-over-form/pour-over-form.module').then((m) => m.PourOverFormModule),
  },
  { path: 'shared/:token', component: SharedCoffeeStatisticsComponent },
  { path: 'change-password/:token', component: ChangePasswordComponent },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then((m) => m.CommunityModule),
  },
  {
    path: 'coffees',
    loadChildren: () => import('./coffees/coffees.module').then((m) => m.CoffeesModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./user-profile/user-profile.module').then((m) => m.UserProfileModule),
  },
  {
    path: 'archive',
    loadChildren: () => import('./coffee-archive/coffee-archive.module').then((m) => m.CoffeeArchiveModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./user-settings/user-settings.module').then((m) => m.UserSettingsModule),
  },
  { path: '**', component: ErrorPageComponent, pathMatch: 'full' },
];
