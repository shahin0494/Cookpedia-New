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
import { HighchartsChartComponent, provideHighcharts } from 'highcharts-angular';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SearchPipe } from '../pipes/search-pipe';


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
    MatCardModule,
    MatDatepickerModule,
    HighchartsChartComponent,
    FormsModule,
    SearchPipe,
    FormsModule,
],
providers:[
  provideNativeDateAdapter(),
  provideHighcharts()
]
})
export class AdminModule { }
