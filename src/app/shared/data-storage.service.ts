import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';

// Need the injectable here to activate the Http service in the constructor (make sure to import the Http into the app module as well)
@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    const headers = new Headers({'Content-Type': 'application/json'});
    // This put method is stored as an observable and isn't activated until it's subscribed to
    // The url has that 'data.json' parameter which is firebase specific, the 'data' node can be whatever string you want
    // ..it will create a node with that name in the firebase database
    // For Firebase specifically, the PUT request overwrites data rather than appending it like the POST request
    return this.http.put(
      'https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json',
      recipes,
      {headers: headers});
  }

  getRecipes() {
    return this.http.get('https://udemy-ng-recipe-book-83029.firebaseio.com/recipes.json')
      // This map function is an observable operator that takes the old observable, wraps/turns it into transformed data,
      // .. and wraps that into another observable
      .map(
        (response: Response) => {
          const recipes = response.json();
          return recipes;
        }
      ).catch(
        (error: Response) => {
          // This return is because we need to provide a response to the observable
          return Observable.throw('Something went wrong');
        }
      );
  }
}