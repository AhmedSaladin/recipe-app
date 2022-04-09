import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/service/shopping.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  Recipes = new BehaviorSubject(this.recipes);

  constructor(private shoppingService: ShoppingService) {}

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.Recipes.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients?: Array<Ingredient>) {
    ingredients?.forEach((ingredient) =>
      this.shoppingService.addNewIngredient(ingredient)
    );
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.Recipes.next(this.recipes);
  }
}
