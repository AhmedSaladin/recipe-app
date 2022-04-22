import { Ingredient } from './ingredient.model';

export class Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Array<Ingredient>;

  constructor(
    name: string,
    desc: string,
    img: string,
    ingredients: Array<Ingredient> = []
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = img;
    this.ingredients = ingredients;
  }
}
