import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  // GCR: the pathMatch: 'full' is key to avoid this redirect applying to all routes (bc all are prefixed with '')
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
];

// This assigns the appRoutes above to the RouterModule, which then gets exported to the app.module
@NgModule({
  imports: [
    // GCR: Use this hash route version if getting 404 error in deployment (see "understanding location strategies")
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
