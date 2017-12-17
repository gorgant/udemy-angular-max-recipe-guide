import * as fromShoppingList from './../shopping-list/store/shopping-list.reducers';
import * as fromAuth from './../auth/store/auth.reducers';

// This interface here makes it easier to assign the type to constructors throughout the app
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}
