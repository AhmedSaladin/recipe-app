export class Recipe {
  name: String;
  description: String;
  imagePath: String;
  ingredients?: String;

  constructor(name: String, desc: String, img: String, ingredients?: String) {
    this.name = name;
    this.description = desc;
    this.imagePath = img;
    this.ingredients = ingredients;
  }
}
