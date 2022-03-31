import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') nameRef?: ElementRef;
  @ViewChild('amount') amountRef?: ElementRef;
  constructor() {}
  @Output('newIngredientAdded') ingredient = new EventEmitter<Ingredient>();
  ngOnInit(): void {}

  addNewIngredient() {
    const name = this.nameRef?.nativeElement.value;
    const amount = this.amountRef?.nativeElement.value;
    this.ingredient.emit(new Ingredient(name, amount));
  }

}
