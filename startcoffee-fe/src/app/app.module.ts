import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { LoginService } from './login/services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreGlobalElementsModule } from './core-global-elements/core-global-elements.module';

import { UnauthorizedInterceptor } from './core-global-elements/services/error-interceptor';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'src/app/app.state.config';
import { RouteGuardService } from './pour-over-form/services/route-guard.service';
import { CanActivateRoute } from './app.route.activation';
import { SharedCoffeeStatisticsComponent } from './shared-coffee-statistics/shared-coffee-statistics.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CoreGlobalElementsModule,
    SharedModule,
    NgSelectModule,
    NgxsModule.forRoot(AppState),
    RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' }),
  ],
  declarations: [AppComponent, SharedCoffeeStatisticsComponent],
  providers: [
    RouteGuardService,
    CanActivateRoute,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    LoginService,
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
