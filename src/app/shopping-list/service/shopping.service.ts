import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 7),
  ];
  constructor() {}

  getIngredients() {
    return this.ingredients;
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
