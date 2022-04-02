import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/service/shopping.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeSelected = new EventEmitter<Recipe>();
  private recipes: Array<Recipe> = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private shoppingService: ShoppingService) {}

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getAllRecipes() {
    return this.recipes;
  }

  getRecipe() {
    return this.recipeSelected;
  }

  setSingleRecipe(recipe?: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  addIngredientsToShoppingList(ingredients?: Array<Ingredient>) {
    ingredients?.forEach((ingredient) =>
      this.shoppingService.addNewIngredient(ingredient)
    );
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }
}
