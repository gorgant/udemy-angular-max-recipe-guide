import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() selectedRecipeDetails = new EventEmitter<Recipe>();
  // @Output() recipeDetails = new EventEmitter<{name: string, description: string, imagePath: string,}>();

  constructor() { }

  ngOnInit() {
  }

  displayDetails() {
    this.selectedRecipeDetails.emit({
      name: this.recipe.name,
      description: this.recipe.description,
      imagePath: this.recipe.imagePath
    });
    console.log("Click registered for " + this.recipe.name);
  }
}
