import { MostCoffeesAddedComponent } from './components/most-coffees-added/most-coffees-added.component';
import { CommunityComponent } from './components/community.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoffeeSubmitService } from '../pour-over-form/services/coffee-submit.service';
import { MostBrewsAddedComponent } from './components/most-brews-added/most-brews-added.component';
import { GeneralStatisticsComponent } from './components/general-statistics/general-statistics.component';
import { CommunityCoffeeListComponent } from './shared/community-coffee-list/community-coffee-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    children: [
      {
        path: '',
        component: GeneralStatisticsComponent,
      },
      {
        path: 'mostcoffees',
        component: MostCoffeesAddedComponent,
      },
      {
        path: 'mostbrews',
        component: MostBrewsAddedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, NgSelectModule, RouterModule.forChild(appRoutes)],
  declarations: [
    CommunityComponent,
    MostCoffeesAddedComponent,
    MostBrewsAddedComponent,
    GeneralStatisticsComponent,
    CommunityCoffeeListComponent,
  ],
  providers: [CoffeeSubmitService],
})
export class CommunityModule {}
