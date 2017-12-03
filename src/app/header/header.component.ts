import { RecipeService } from './../recipes/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService) { }

  ngOnInit() {
  }
  onSaveRecipes() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onFetchData() {
    this.dataStorageService.getRecipes();
  }

}
