import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes?: Array<Recipe>;
  sub?: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.sub = this.recipeService.Recipes.subscribe(
      (data) => (this.recipes = data)
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
