import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, take } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/service/shopping.service';
import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Array<Recipe> = [];
  Recipes = new BehaviorSubject(this.recipes);
  url = environment.BASE_URL;

  constructor(
    private shoppingService: ShoppingService,
    private http: HttpClient
  ) {}

  storeRecipes() {
    this.http.put(`${this.url}/recipe.json`, this.recipes).subscribe();
  }

  getRecipes() {
    this.http.get<Recipe[]>(`${this.url}/recipe.json`).subscribe((data) => {
      this.recipes = data;
      this.Recipes.next(data);
    });
  }

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
