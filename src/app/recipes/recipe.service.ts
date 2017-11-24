import { Output, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipeLoaded = false;

  recepies: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg' ),
    new Recipe('A Different Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg' ),
  ]

  shareRecipe(recipe: Recipe) {
    console.log("Sharing recipe to emitter (in recipe service)");
    this.recipeSelected.emit(recipe);
    this.recipeLoaded = true;
  }


}