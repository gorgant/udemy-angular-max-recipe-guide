import { NgModule } from '@angular/core';

import { AuthGuard } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './../recipes/recipe.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

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
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {}
