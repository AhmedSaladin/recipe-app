import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') nameRef?: ElementRef;
  @ViewChild('amount') amountRef?: ElementRef;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  addNewIngredient() {
    const name = this.nameRef?.nativeElement.value;
    const amount = this.amountRef?.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingService.addNewIngredient(ingredient);
  }
}
