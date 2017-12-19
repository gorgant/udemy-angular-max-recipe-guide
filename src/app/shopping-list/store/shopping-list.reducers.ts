import { Action } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from './../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// Basic setup: import state, export action
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
        // Add the new payload to the existing array
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // replace existing ingredient data with new ingredient data
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      // fetch the existing ingredients in a modifiable array
      const ingredients = [...state.ingredients];
      // update the selected ingredient
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      // replace data in primary array with this new array of ingredients
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      // fetch the existing ingredients in a modifiable array (used 'mod' here to avoid typescript conflict error w const in Update above)
      const modIngredients = [...state.ingredients];
      // note that the payload in this case is just the index
      modIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: modIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
      case ShoppingListActions.START_EDIT:
        const editedIngredient = {...state.ingredients[action.payload]};
        return {
          ...state,
          editedIngredient: editedIngredient,
          editedIngredientIndex: action.payload
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
    default:
      return state;
  }
}
