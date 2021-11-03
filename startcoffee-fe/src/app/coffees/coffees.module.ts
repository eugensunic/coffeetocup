import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoffeesComponent } from './coffees.component';
import { OriginFiltrateComponent } from './components/by-origin/origin-filtrate/origin-filtrate.component';
import { BrewFiltrateComponent } from './components/by-brew/brew-filtrate/brew-filtrate.component';
import { UserOriginDisplayComponent } from './components/by-origin/origin-user-display/user-origin-display.component';
import { CountryDisplayComponent } from './components/by-brew/brew-country-display/country-display.component';
import { UserBrewDisplayComponent } from './components/by-brew/brew-user-display/user-brew-display.component';
import { StatisticsCoffeeService } from './services/statistics-coffee.service';
import { FiltratedUsersComponent } from './components/result-filtrated-users/filtrated-users.component';
import { CoffeeChartComponent } from './components/coffee-chart/coffee-chart.component';
import { FormsModule } from '@angular/forms';
import { OriginDisplayComponent } from './components/shared/origin-display/origin-display.component';
import { BrewDisplayComponent } from './components/shared/brew-display/brew-display.component';
import { OriginBrewDisplayComponent } from './components/by-origin/origin-brew-display/origin-brew-display.component';
import { UserDisplayComponent } from './components/shared/user-display/user-display.component';
import {
  CanActivateCoffeesByBrew,
  CanActivateCoffeesByOrigin,
  CanActivateCoffeesUsersFiltered,
} from '../app.routing';

const appRoutes: Routes = [
  {
    path: '',
    component: CoffeesComponent,
    children: [
      {
        path: '',
        component: OriginFiltrateComponent,
      },
      {
        path: 'charts',
        component: CoffeeChartComponent,
      },
      {
        path: 'originbrewlist',
        canActivate: [CanActivateCoffeesByOrigin],
        component: OriginBrewDisplayComponent,
      },
      {
        path: 'originbrewuser',
        canActivate: [CanActivateCoffeesByOrigin],
        component: UserOriginDisplayComponent,
      },
      {
        path: 'bybrewing',
        component: BrewFiltrateComponent,
      },
      {
        path: 'brewingoriginlist',
        canActivate: [CanActivateCoffeesByBrew],
        component: CountryDisplayComponent,
      },
      {
        path: 'breworiginuser',
        canActivate: [CanActivateCoffeesByBrew],
        component: UserBrewDisplayComponent,
      },
      {
        path: 'selecteduser',
        canActivate: [CanActivateCoffeesUsersFiltered],
        component: FiltratedUsersComponent,
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, NgSelectModule, RouterModule.forChild(appRoutes)],
  declarations: [
    CoffeesComponent,
    OriginFiltrateComponent,
    BrewFiltrateComponent,
    BrewDisplayComponent,
    UserOriginDisplayComponent,
    CountryDisplayComponent,
    UserBrewDisplayComponent,
    FiltratedUsersComponent,
    CoffeeChartComponent,
    OriginDisplayComponent,
    OriginBrewDisplayComponent,
    UserDisplayComponent,
  ],
  providers: [StatisticsCoffeeService],
})
export class CoffeesModule {}
