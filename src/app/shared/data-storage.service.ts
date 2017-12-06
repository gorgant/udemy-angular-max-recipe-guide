import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.service';

// Need the injectable here to activate the Http service in the constructor (make sure to import the Http into the app module as well)
@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();

    const recipes = this.recipeService.getRecipes();
    const headers = new Headers({'Content-Type': 'application/json'});
    // This put method is stored as an observable and isn't activated until it's subscribed to
    // The url has that 'data.json' parameter which is firebase specific, the 'data' node can be whatever string you want
    // ..it will create a node with that name in the firebase database
    // For Firebase specifically, the PUT request overwrites data rather than appending it like the POST request
    return this.http.put(
      'https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json?auth=' + token,
      recipes,
      {headers: headers});
  }

  getRecipes() {
    const token = this.authService.getToken();

    // this mapping function ensures that if there are no ingredients, a blank array is inserted
    return this.http.get('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
