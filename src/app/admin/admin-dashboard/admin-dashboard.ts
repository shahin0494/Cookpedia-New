import { Component, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  selected = new Date()
  chartOptions: Highcharts.Options = {}; // Required
  isSideBarOpen: boolean = true
  api = inject(ApiService)
  router = inject(Router)

  userCount: number = 0
  recipeCount: number = 0
  downloadCount: number = 0
  notification: number = 0

  constructor() {
    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: "Analysis of Download Recipe Based on Cuisine"
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total Download Recipe Count'
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Cuisine',
        colorByPoint: true,
        type: 'bar',
        data: [{
          name: "Itaian",
          y: 35,

        }]
      }]
    }
  }

  ngOnInit() {
    this.getUser()
    this.getRecipe()
    this.getDownloads()
    this.getNotification()
  }

  getUser() {
    this.api.getAllUsersAPI().subscribe((res: any) => {
      this.userCount = res.length
    })
  }

  getRecipe() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      this.recipeCount = res.length
    })
  }
  getDownloads() {
    this.api.getAllDownloadsAPI().subscribe((res: any) => {
      this.downloadCount = res.map((item: any) => item.count).reduce((acc: any, curr: any) => acc + curr)
    })
  }
  getNotification() {
    this.api.getAllFeedbacksAPI().subscribe((res: any) => {
      this.notification = res.filter((item: any) => item.status == "pending").length
    })
  }

  toggleSideBAr() {
    this.isSideBarOpen = !this.isSideBarOpen
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl("/")
  }

}
