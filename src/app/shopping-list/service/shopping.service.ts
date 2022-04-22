import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 7),
  ];

  Ingredients = new BehaviorSubject(this.ingredients);
  editIngredient = new Subject<number>();
  constructor() {}

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.Ingredients.next(this.ingredients);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.Ingredients.next(this.ingredients);
  }
}
