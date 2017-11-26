import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

const appRoutes: Routes = [
  //GCR: the pathMatch: 'full' is key to avoid this redirect applying to all routes (bc all are prefixed with '')
  //GCR: the order of these is critical -- e.g., parameters like ':id' need to go after 'new', else for 'new' it will try to parse that as an ID
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, 
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ] 
  },
  { path: 'shopping-list', component: ShoppingListComponent }
];

//This assigns the appRoutes above to the RouterModule, which then gets exported to the app.module
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