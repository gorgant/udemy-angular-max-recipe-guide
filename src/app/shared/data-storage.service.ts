import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.service';

// Need the injectable here to activate the Http service in the constructor (make sure to import the Http into the app module as well)
@Injectable()
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    // We'd need these headers if we were using some other form of authorization other than Firebase
    // const headers = new HttpHeaders().set('Authorization', 'Bearer asldfkjslfj');

    const recipes = this.recipeService.getRecipes();
    // This put method is stored as an observable and isn't activated until it's subscribed to
    // The url has that 'data.json' parameter which is firebase specific, the 'data' node can be whatever string you want
    // ..it will create a node with that name in the firebase database
    // For Firebase specifically, the PUT request overwrites data rather than appending it like the POST request
    // return this.httpClient.put(
    //   'https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
    //   recipes,
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: headers
    //   });
    // This manual request approach allows you to inspect the progress of the request and optionally include
    // loading status using the 'loaded' and 'total' properties in the response object
    const req = new HttpRequest(
      'PUT',
      'https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
      recipes,
      {
        reportProgress: true
      });
      return this.httpClient.request(req);
  }

  getRecipes() {
    // this mapping function ensures that if there are no ingredients, a blank array is inserted
    // return this.httpClient.get<Recipe[]>('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json?auth=' + token)
    // This additional parameter with the observe is totally optional, just allows you to change the response type if you choose
    this.httpClient.get<Recipe[]>('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
      })
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return [];
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
