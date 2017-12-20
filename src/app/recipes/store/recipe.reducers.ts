import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../recipe.model';

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
  // editedRecipe: Recipe;
  // editedRecipeIndex: number;
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]),
    new Recipe(
      'Big Fat Burger',
      'Yeah, its that good',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1920px-Hamburger_%28black_bg%29.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]),
  ],
  // editedRecipe: null,
  // editedRecipeIndex: -1
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        // Add the new payload to the existing array
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      // replace existing recipe data with new recipe data
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      // fetch the existing recipes in a modifiable array
      const recipes = [...state.recipes];
      // update the selected recipe
      recipes[action.payload.index] = updatedRecipe;
      // replace data in primary array with this new array of recipes
      return {
        ...state,
        recipes: recipes,
        // editedRecipe: null,
        // editedRecipeIndex: -1
      };
    case RecipeActions.DELETE_RECIPE:
      const modRecipes = [...state.recipes];
      modRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: modRecipes
      };
    default:
      return state;
  }
}
