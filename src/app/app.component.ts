import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipe = true;

  onRecipeClick(){
    this.showRecipe = true;
  }

  onShoppingClick(){
    this.showRecipe = false;
  }

}
