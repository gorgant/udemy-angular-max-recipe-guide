import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Recipe } from './../recipe.model';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      // this mapping function ensures that if there are no ingredients, a blank array is inserted
      // return this.httpClient.get<Recipe[]>('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json?auth=' + token)
      // This additional parameter with the observe is totally optional, just allows you to change the response type if you choose
      return this.httpClient.get<Recipe[]>('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  // Dispatch: false indicates that no resulting action is desired
  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    // withLatestFrom allows you to combine the value from ofType (i.e., the action) with another observable's value
    // Spits out an array with the value of the first and second operator, which gets picked up in switchMap
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
        state.recipes,
        {
          reportProgress: true
        });
        return this.httpClient.request(req);
    });

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromRecipe.FeatureState>) {}
}
