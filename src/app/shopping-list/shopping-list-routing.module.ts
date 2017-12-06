import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const shoppingListRoutes: Routes = [
    { path: '', component: ShoppingListComponent },
];

@NgModule({
    // forChild is used everywhere but the app module, which uses forRoot
    imports: [
      RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [RouterModule]
  })
  export class ShoppingListRoutingModule {}

