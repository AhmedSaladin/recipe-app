import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  name: String;
  description: String;
  imagePath: String;
  ingredients: Array<Ingredient>;

  constructor(
    name: String,
    desc: String,
    img: String,
    ingredients: Array<Ingredient>
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = img;
    this.ingredients = ingredients;
  }
}
