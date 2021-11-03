import { PourOverFormComponent } from './components/pour-over-form.component';
import { SharedModule } from '../shared/shared.module';
import { CoffeeSubmitService } from './services/coffee-submit.service';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewingProcessComponent } from './components/brewing-process-input/brewing-process.component';
import { CoffeeAttributeComponent } from './components/coffee-attributes-input/coffee-attribute.component';
import { CoffeeOriginComponent } from './components/coffee-origin-input/coffee-origin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreGlobalElementsModule } from '../core-global-elements/core-global-elements.module';
import { CanActivateForm } from '../app.routing';

const appRoutes: Routes = [
  {
    path: '',
    component: PourOverFormComponent,
    children: [
      { path: 'origin', canActivate: [CanActivateForm], component: CoffeeOriginComponent },
      {
        path: 'brew',
        canActivate: [CanActivateForm],
        component: BrewingProcessComponent,
      },
      {
        path: 'attributes',
        canActivate: [CanActivateForm],
        component: CoffeeAttributeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreGlobalElementsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    BrewingProcessComponent,
    CoffeeAttributeComponent,
    CoffeeOriginComponent,
    PourOverFormComponent,
  ],
  providers: [CoffeeSubmitService],
})
export class PourOverFormModule {}
