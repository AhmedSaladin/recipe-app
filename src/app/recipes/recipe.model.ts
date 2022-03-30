export class Recipe {
  name: String;
  description: String;
  imagePath: String;

  constructor(name: String, desc: String, img: String) {
    this.name = name;
    this.description = desc;
    this.imagePath = img;
  }
}
