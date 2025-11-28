import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminRecipelist } from './admin-recipelist/admin-recipelist';
import { AdminDownloadlist } from './admin-downloadlist/admin-downloadlist';
import { AdminUserlist } from './admin-userlist/admin-userlist';
import { AdminAddrecipe } from './admin-addrecipe/admin-addrecipe';
import { AdminFeedbacklist } from './admin-feedbacklist/admin-feedbacklist';

const routes: Routes = [
  // localhost:4200/admin
  {
    path:"",component:AdminDashboard,title:"Dashboard"
  },
  {
    path:"recipe-list",component:AdminRecipelist,title:"Recipes-Admin"
  },
  {
    path:"download-list",component:AdminDownloadlist,title:"Downloads - Admin"
  },
  {
    path:"user-list",component:AdminUserlist,title:"Admin - Users"
  },
  {
    path:"feedback-list",component:AdminFeedbacklist,title:"Admin - feedbacks"
  },
  {
    path:"recipe/add",component:AdminAddrecipe,title:"Admin - Add Recipe"
  },
  {
    path:"recipe/:id/edit",component:AdminAddrecipe,title:"Admin - Edit Recipe"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
