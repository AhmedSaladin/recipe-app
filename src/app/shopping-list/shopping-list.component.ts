import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Array<Ingredient>;
  sub?: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.sub = this.shoppingService.Ingredients.subscribe(
      (data) => (this.ingredients = data)
    );
  }

  onEditItem(index: number) {
    this.shoppingService.editIngredient.next(index);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
