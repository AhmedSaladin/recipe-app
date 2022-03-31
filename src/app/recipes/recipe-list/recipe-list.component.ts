import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeChanged = new EventEmitter<Recipe>();
  recipes: Array<Recipe> = [
    new Recipe(
      'Test 1',
      'Simple recipe test 1',
      'https://pixabay.com/get/g98852dcc569a9a2fea22e89f31b96acc94e3fe06585f877ff442d639b331e70d0742536e0523408ae9693e6f80833a972282d39ef7cd30cc11b110579f7f4af360eaa3336eaf362fdaa24ac34a31e6c9_640.jpg'
    ),
    new Recipe(
      'Test 2',
      'Simple recipe test 2',
      'https://pixabay.com/get/g470b68444e65ab6362ac6f5e48316356a202c0cdd0bc198864ff92245cc3f03b77b01c0773582cf2713f06ad395d812e714197086f23638080e438115cd077dae336ec66e95448387c756b5533304353_640.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}

  changeRecipe(recipe: Recipe) {
    this.recipeChanged.emit(recipe);
  }
}
