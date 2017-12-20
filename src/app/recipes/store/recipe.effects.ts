import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../recipe.model';

import * as RecipeActions from './recipe.actions';

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

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {}
}
