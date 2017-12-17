import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { Recipe } from './../../recipes/recipe.model';
import { AuthService } from './../../auth/auth.service';
import { RecipeService } from './../../recipes/recipe.service';
import { DataStorageService } from './../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  onSaveRecipes() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
