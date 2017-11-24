import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  // @Output() recipeDetails = new EventEmitter<{name: string, description: string, imagePath: string,}>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onSelected() {
    console.log("recipe item click logged");
    this.recipeService.shareRecipe(this.recipe);
  }
}
