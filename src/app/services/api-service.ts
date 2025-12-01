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

  // add feedback-user feedback
  addFeedBackAPI(feedback: any) {
    return this.http.post(`${this.serverURL}/user/feedback`, feedback)
  }

  // get approved feedbakcs
  getApprovedFeedbacksAPI() {
    return this.http.get(`${this.serverURL}/user/feedbacks/approved`)
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

  // save recpe api
  saveRecipeAPI(recipe: any) {
    // /recipe/:id/save
    return this.http.post(`${this.serverURL}/recipes/${recipe._id}/save`, recipe, this.appendToken())
  }

  // get all saved recipe
  getAllSaveRecipeAPI() {
    // /recipe/saved
    return this.http.get(`${this.serverURL}/recipes/saved`, this.appendToken())
  }

  // delete saved recipe
  deleteRecipeAPI(recipeId: any) {
    // /recipe/:id/delete
    return this.http.delete(`${this.serverURL}/recipes/${recipeId}/delete`, this.appendToken())
  }

  // get all users - admin
  getAllUsersAPI() {
    return this.http.get(`${this.serverURL}/users`, this.appendToken())
  }

  // get all downloads - admin
  getAllDownloadsAPI() {
    return this.http.get(`${this.serverURL}/downloads`, this.appendToken())
  }

  // get all feedbacks - admin
  getAllFeedbacksAPI() {
    return this.http.get(`${this.serverURL}/feedbacks`, this.appendToken())
  }

  // update feedbacks - admin
  updateFeedbackStatusAPI(id: string, status: string) {
    return this.http.put(`${this.serverURL}/feedbacks/${id}/edit?status=${status}`, {}, this.appendToken())
  }

}

