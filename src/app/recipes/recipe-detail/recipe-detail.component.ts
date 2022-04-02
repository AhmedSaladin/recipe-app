import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shopping-list/service/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipe().subscribe((data) => (this.recipe = data));
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients);
  }
}
