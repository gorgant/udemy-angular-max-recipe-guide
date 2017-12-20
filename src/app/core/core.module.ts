import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './../auth/auth-guard.service';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { LoggingInterceptor } from './../shared/logging.interceptor';

import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    // Need this for the dropdown
    SharedModule,
    // Need this for the various routes used
    AppRoutingModule
  ],
  exports: [
    // Need to export this bc always need your root routes in the app module
    AppRoutingModule,
    // Need to export header bc used in app.component.html
    HeaderComponent
  ],
  providers: [
    // Angular will load one instance of all of these for the app as long as this core module is loaded eagerly
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}
