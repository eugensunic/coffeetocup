import { NgSelectModule } from '@ng-select/ng-select';
import { CoreGlobalElementsModule } from '../core-global-elements/core-global-elements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserChartProfileComponent } from './components/user-chart-profile/user-chart-profile.component';
import { UserDefaultProfileComponent } from './components/user-default-profile/user-default-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCountryWrapperComponent } from './components/user-country-wrapper/user-country-wrapper.component';
// tslint:disable-next-line:max-line-length
import { UserCountryProfileComponent } from './components/user-country-wrapper/components/user-country-profile/user-country-profile.component';
import { UserCountryUniqueComponent } from './components/user-country-wrapper/components/user-country-unique/user-country-unique.component';
import { CanActivateUniqueCountry } from '../app.routing';
import { StatisticsService } from './services/statistics.service';

const appRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        component: UserCountryWrapperComponent,
        children: [
          {
            path: '',
            component: UserCountryProfileComponent,
          },
          {
            path: 'selectedorigin',
            canActivate: [CanActivateUniqueCountry],
            component: UserCountryUniqueComponent,
          },
        ],
      },
      {
        path: 'allcoffees',
        component: UserDefaultProfileComponent,
      },
      {
        path: 'chartProfile',
        component: UserChartProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    CoreGlobalElementsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    UserProfileComponent,
    UserDefaultProfileComponent,
    UserCountryProfileComponent,
    UserCountryUniqueComponent,
    UserChartProfileComponent,
    UserCountryWrapperComponent,
  ],
  providers: [StatisticsService],
  exports: [],
})
export class UserProfileModule {}
