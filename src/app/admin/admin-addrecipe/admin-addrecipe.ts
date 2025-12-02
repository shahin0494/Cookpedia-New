import { Component, inject } from '@angular/core';
import { RecipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-addrecipe',
  standalone: false,
  templateUrl: './admin-addrecipe.html',
  styleUrl: './admin-addrecipe.css',
})
export class AdminAddrecipe {

  route = inject(ActivatedRoute)
  recipeID: string = ""
  api = inject(ApiService)
  recipeDetails: RecipeModel = {}
  ingredientsArray: any = []
  instructionArray: any = []
  mealArray: any = []
  selectedMealLabelArray: any = []
  router = inject(Router)

  constructor() {
    this.route.params.subscribe((res: any) => {
      //console.log(res);
      this.recipeID = res.id
    })
  }

  ngOnInit() {
    this.getAllRecipe()
  }

  getAllRecipe() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      if (this.recipeID) {
        this.recipeDetails = res.find((item: any) => item._id == this.recipeID)
        this.instructionArray = this.recipeDetails.instructions
        this.ingredientsArray = this.recipeDetails.ingredients
        this.selectedMealLabelArray = this.recipeDetails.mealType
      }
      const dummyMeal = res.map((item: any) => item.mealType)
      dummyMeal.flat(Infinity).forEach((item: any) => {
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);

    })
  }

  addIngredients(ingredientInput: any) {
    if (ingredientInput.value) {
      this.ingredientsArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }

  removeIngredients(value: string) {
    this.ingredientsArray = this.ingredientsArray.filter((item: string) => item != value)
  }

  addInstructions(instrucitonInput: any) {
    if (instrucitonInput.value) {
      this.instructionArray.push(instrucitonInput.value)
      instrucitonInput.value = ""
    }
  }

  removeInstructions(value: string) {
    this.instructionArray = this.instructionArray.filter((item: string) => item != value)
  }

  chooseMeal(mealCheckEvent: any) {
    if (mealCheckEvent.target.checked) {
      !this.selectedMealLabelArray.includes(mealCheckEvent.target.checked) && this.selectedMealLabelArray.push(mealCheckEvent.target.name)
    } else {
      this.selectedMealLabelArray = this.selectedMealLabelArray.filter((item: string) => item != mealCheckEvent.target.name)
    }
  }

  addRecipe() {
    this.recipeDetails.ingredients = this.ingredientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.selectedMealLabelArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } = this.recipeDetails
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing) {
      // make api call
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next: (res: any) => {
          alert("New recipe addedd successfully")
          this.recipeDetails = {}
          this.instructionArray = []
          this.ingredientsArray = []
          this.selectedMealLabelArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    } else {
      alert("Please fill the form completely")
    }
  }

  removeMealType(meal: string) {
    this.selectedMealLabelArray = this.selectedMealLabelArray.filter((item: string) => item != meal)
  }

editRecipe() {
    this.recipeDetails.ingredients = this.ingredientsArray
    this.recipeDetails.instructions = this.instructionArray
    this.recipeDetails.mealType = this.selectedMealLabelArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } = this.recipeDetails
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing) {
      // make api call
      this.api.editRecipeAPI(this.recipeID,this.recipeDetails).subscribe({
        next: (res: any) => {
          alert(" recipe updated successfully")
          this.recipeDetails = {}
          this.instructionArray = []
          this.ingredientsArray = []
          this.selectedMealLabelArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    } else {
      alert("Please fill the form completely")
    }
  }

}



