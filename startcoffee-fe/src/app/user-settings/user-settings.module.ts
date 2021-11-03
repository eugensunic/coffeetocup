import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreGlobalElementsModule } from '../core-global-elements/core-global-elements.module';
import { SharedModule } from '../shared/shared.module';
import { UserSettingsComponent } from './components/user-settings.component';
import { UserSettingsService } from './services/user-settings.service';

const appRoutes: Routes = [
  {
    path: '',
    component: UserSettingsComponent,
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
  declarations: [UserSettingsComponent],
  providers: [UserSettingsService],
  exports: [],
})
export class UserSettingsModule {}
