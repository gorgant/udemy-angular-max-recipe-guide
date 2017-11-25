import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsFromRecipe(recipeIngredients: Ingredient[]) {
    for (let i = 0; i < recipeIngredients.length; i++) {
      this.ingredients.push(recipeIngredients[i]);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}