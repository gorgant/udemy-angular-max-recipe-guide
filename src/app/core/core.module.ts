import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

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
  ]
})
export class CoreModule {}
