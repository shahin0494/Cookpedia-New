import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-save-recipe',
  imports: [Header, Footer],
  templateUrl: './save-recipe.html',
  styleUrl: './save-recipe.css',
})
export class SaveRecipe {

}
