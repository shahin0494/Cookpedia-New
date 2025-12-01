import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';
import { AdminUserlist } from './admin-userlist/admin-userlist';
import { AdminFeedbacklist } from './admin-feedbacklist/admin-feedbacklist';
import { AdminAddrecipe } from './admin-addrecipe/admin-addrecipe';
import { AdminDownloadlist } from './admin-downloadlist/admin-downloadlist';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { HighchartsChartComponent } from 'highcharts-angular';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AdminDashboard,
    AdminRecipelist,
    AdminUserlist,
    AdminFeedbacklist,
    AdminAddrecipe,
    AdminDownloadlist,
    AdminSidebar
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HighchartsChartComponent,
    FormsModule
]
})
export class AdminModule { }
