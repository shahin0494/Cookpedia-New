import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  recipeId: any = ""
  recipe: any = {}
  relatedRecipes: any = []
  api = inject(ApiService)
  route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.recipeId = res.id
      // console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails(id: any) {
    this.api.viewRecipeAPI(id).subscribe({
      next: (res: any) => {
        this.recipe = res
        console.log(this.recipe);
        this.getRelatedRecipes(res.cuisine)
      },
      error: (reason: any) => {
        alert(reason.error)
      }
    })
  }

  // related recipes
  getRelatedRecipes(cuisine: any) {
    this.api.relatedRecipeAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        this.relatedRecipes = res.filter((item: any) => item.name != this.recipe.name)
        console.log(this.relatedRecipes);
      } else {
        this.relatedRecipes = []
      }
    })
  }

  // api for download
  addToDownload() {
    this.api.addToDownloadAPI(this.recipe).subscribe((res: any) => {
      this.api.getChartData()
      this.downloadRecipe()
    })
  }

  // download recipe
  downloadRecipe() {
    let pdf = new jsPDF()
    let headRow = ['Name', 'Cuisine', 'Servings', 'Ingredients', 'Instructions']
    let bodyData = [this.recipe.name, this.recipe.cuisine, this.recipe.servings, this.recipe.ingredients, this.recipe.instructions]
    autoTable(pdf, {
      head: [headRow],
      body: [bodyData]
    })
    pdf.save('recipe.pdf')
  }

  // save recipe
  saveRecipe() {
    this.api.saveRecipeAPI(this.recipe).subscribe({
      next: (res: any) => {
        alert(`${res.recipeName} added to your collection ☺️🥳🎉`)
      },
      error: (reason: any) => {
        alert(reason.error)
      }
    })
  }
}
