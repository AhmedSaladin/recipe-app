import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/service/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onSaveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.getRecipes();
  }
}
