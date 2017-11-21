import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('recipeClicked') recipeClicked = new EventEmitter<boolean>();
  @Output('shoppingListClicked') shoppingListClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeClick(){
    this.recipeClicked.emit(true);
    console.log("recipe clicked");
  }

  onShoppingListClick(){
    this.shoppingListClicked.emit(true);
    console.log("shopping clicked");
  }

}
