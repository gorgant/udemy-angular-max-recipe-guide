import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  // @Output() recipeDetails = new EventEmitter<{name: string, description: string, imagePath: string,}>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.recipeSelected.emit();
  }
}
