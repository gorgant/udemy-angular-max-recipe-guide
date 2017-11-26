import { Output, EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recepies: Recipe[] = [
    new Recipe(
      0,
      'Tasty Schnitzel', 
      'A super-tasty Schnitzel - just awesome!', 
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',20),        
      ]),
    new Recipe(
      1,
      'Big Fat Burger', 
      'Yeah, its that good', 
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1920px-Hamburger_%28black_bg%29.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1),        
      ]),
  ];

  getRecipes() {
    return this.recepies.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recepies.find(
      (r) => {
        return r.id === id;
      }
    );
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients.slice());
  }



}