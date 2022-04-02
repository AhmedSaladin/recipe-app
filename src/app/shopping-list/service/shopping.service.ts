import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 7),
  ];

  Ingredients = new BehaviorSubject(this.ingredients);
  constructor() {}



  addNewIngredient(ingredient: Ingredient) {
    this.Ingredients.next([...this.Ingredients.value, ingredient]);
  }
}
