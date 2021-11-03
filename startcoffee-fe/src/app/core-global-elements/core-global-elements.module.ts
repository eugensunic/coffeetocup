import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeepSessionAliveService } from './services/keep-session-alive.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ChangePasswordComponent, ErrorPageComponent],
  exports: [ChangePasswordComponent, ErrorPageComponent],
  providers: [KeepSessionAliveService]
})
export class CoreGlobalElementsModule {}
