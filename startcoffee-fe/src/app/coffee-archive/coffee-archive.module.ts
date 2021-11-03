import { NgSelectModule } from '@ng-select/ng-select';
import { CoreGlobalElementsModule } from '../core-global-elements/core-global-elements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeArchiveComponent } from './components/coffee-archive.component';
import { UserProfileService } from '../user-profile/services/user-profile.service';

const appRoutes: Routes = [
  {
    path: '',
    component: CoffeeArchiveComponent,
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
  declarations: [CoffeeArchiveComponent],
  providers: [UserProfileService],
})
export class CoffeeArchiveModule {}
