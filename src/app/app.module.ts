import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store/src/store_module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';


@NgModule({
  declarations: [
    // All other components are in their respective feature modules and are loaded when their route is activated
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule,
    ShoppingListModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  // Providers are all stored in the core module
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
