import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipies',
  imports: [Header, Footer, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipies {
  p:number = 1
  allRecipes: any = []
  dummyAllRecipe: any = []
  api = inject(ApiService)
  router = inject(Router)
  cuisineArray: any = []
  mealArray: any = []
  searchKey: string = ""

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecipes = res
        this.dummyAllRecipe = res
        this.allRecipes.forEach((item: any) => {
          !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        })
        //console.log(this.cuisineArray);
        const dummyMealArray = this.allRecipes.map((item: any) => item.mealType).flat(Infinity)
        dummyMealArray.forEach((item: any) => {
          !this.mealArray.includes(item) && this.mealArray.push(item)
        })
        //console.log(this.mealArray);

      }
    })
  }

  // filter recipe
  filterRecipe(key: string, value: string) {
    this.allRecipes = this.dummyAllRecipe.filter((item: any) => item[key] == value)
    console.log(this.allRecipes);

  }

  // navigate to view
  navigateView(recipeId: string) {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl(`recipe/${recipeId}/view`)
    } else {
      alert("Please login to get full access to our recipe collection")
    }
  }

}
