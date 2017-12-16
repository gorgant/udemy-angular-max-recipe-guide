import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // This "lazy load" style using loadChildren ensures these only load when they are called, rather than at app start
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuard] },
  { path: 'shopping-list', component: ShoppingListComponent }
];

// This assigns the appRoutes above to the RouterModule, which then gets exported to the app.module
@NgModule({
  imports: [
    // GCR: Use this hash route version if getting 404 error in deployment (see "understanding location strategies")
    // RouterModule.forRoot(appRoutes, {useHash: true})

    // This preloading strategy preloads selected modules (in this case all) after the initial load takes place
    // ... note that if an AuthGuard is present on a route, then it doesn't pre-load (need to remove to get it to work)
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules} )
  ],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
