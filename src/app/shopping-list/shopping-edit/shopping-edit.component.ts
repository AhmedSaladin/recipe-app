import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form?: NgForm;
  sub?: Subscription;
  editMode = false;
  editedIndex?: number;
  editedItem?: Ingredient;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.sub = this.shoppingService.editIngredient.subscribe((index) => {
      this.editedIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.form?.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    const ingredient = new Ingredient(data.name, data.amount);
    if (this.editMode)
      this.shoppingService.updateIngredient(this.editedIndex!, ingredient);
    else this.shoppingService.addNewIngredient(ingredient);

    this.onClear();
  }

  onClear() {
    this.form?.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedIndex!);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
