import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  http = inject(HttpClient)
  serverURL = "http://localhost:3000"

  // get all recipes
  getAllRecipesAPI() {
    return this.http.get(`${this.serverURL}/all-recipes`)
  }

  // register
  registerAPI(reqBody: any) {
    return this.http.post(`${this.serverURL}/register`, reqBody)
  }

  // login
  loginAPI(reqBody: any) {
    return this.http.post(`${this.serverURL}/login`, reqBody)
  }

  // append token 
  appendToken() {
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // view recipe
  viewRecipeAPI(recipeId: string) {
    return this.http.get(`${this.serverURL}/recipe/${recipeId}/view`, this.appendToken())
  }

  // related recipe
  relatedRecipeAPI(cuisine: string) {
    return this.http.get(`${this.serverURL}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  // add to download api
  addToDownloadAPI(recipe: any) {
    // /recipe/:id/download
    return this.http.put(`${this.serverURL}/recipe/${recipe._id}/download`, recipe, this.appendToken())
  }

}

