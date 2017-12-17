import { Action } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      // replace existing ingredient data with new ingredient data
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      // fetch the existing ingredients in a modifiable array
      const ingredients = [...state.ingredients];
      // update the ingredients
      ingredients[action.payload.index] = updatedIngredient;
      // replace data in primary array with this new array of ingredients
      return {
        ...state,
        ingredients: ingredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      // fetch the existing ingredients in a modifiable array (used 'mod' here to avoid typescript conflict error w const in Update above)
      const modIngredients = [...state.ingredients];
      // note that the payload in this case is just the index
      modIngredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: modIngredients
      };
    default:
      return state;
  }
}
