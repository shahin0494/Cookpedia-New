import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-save-recipe',
  imports: [Header, Footer],
  templateUrl: './save-recipe.html',
  styleUrl: './save-recipe.css',
})
export class SaveRecipe {
  recipes: any = []
  api = inject(ApiService)

  ngOnInit() {
    this.getAllSavedRecipe()
  }

  getAllSavedRecipe() {
    this.api.getAllSaveRecipeAPI().subscribe((res: any) => {
      this.recipes = res
      console.log(this.recipes);

    })
  }

  deleteRecipe(id: any) {
    this.api.deleteRecipeAPI(id).subscribe((res: any) => {
      this.getAllSavedRecipe()
    })
  }

}
