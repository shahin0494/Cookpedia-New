import { Component, inject } from '@angular/core';
import { RecipeModel } from '../model/recipeModel';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-addrecipe',
  standalone: false,
  templateUrl: './admin-addrecipe.html',
  styleUrl: './admin-addrecipe.css',
})
export class AdminAddrecipe {
  api = inject(ApiService)
  recipeDetails: RecipeModel = {}
  ingredientsArray: any = []
  instructionArray: any = []
  mealArray: any = []
  selectedMealLabelArray: any = []

  ngOnInit() {
    this.getAllRecipe()
  }

  getAllRecipe() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
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
        
    }
  }
}
