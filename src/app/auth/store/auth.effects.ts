import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  // This will trigger anytime the action type below fires anywhere in our application
  // Effects should always dispatch an action/new effect in the end that changes the application store,
  // ... in this case to sign up and set token (if not, you have to configure as such in decorator)
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    // switchMap is picking up what the map function above returns (i.e., the payload)
    .switchMap((authData: {username: string, password: string}) => {
      // fromPromise converts promises into observables
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    // Using mergeMap here instead so that the return object automatically gets converted into an observable, 
    // ...and it merges multiple observables into one, in this case, the signup and setting token
    // If just want one action, use the map operator, but for multiple use mergeMap
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

    // $ sign is optional and indidcates an observable
    // actions$ is a list of all the actions we have in our app
    constructor(private actions$: Actions) {

    }
}
