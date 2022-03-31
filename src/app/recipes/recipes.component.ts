import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  @Input('I_recipe') O_recipe?: Recipe;
  constructor() {}

  ngOnInit(): void {}

  recipeChange(recipe: Recipe) {
    this.O_recipe = recipe;
  }
}
