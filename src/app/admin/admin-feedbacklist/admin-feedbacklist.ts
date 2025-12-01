import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-feedbacklist',
  standalone: false,
  templateUrl: './admin-feedbacklist.html',
  styleUrl: './admin-feedbacklist.css',
})
export class AdminFeedbacklist {
  api = inject(ApiService)
  allFeedbacks: any = []

  ngOnInit() {
    this.getAllFeedbacks()
  }

  getAllFeedbacks() {
    this.api.getAllFeedbacksAPI().subscribe((res: any) => {
      this.allFeedbacks = res
    })
  }

  editStatus(id:string,status:string){
    this.api.updateFeedbackStatusAPI(id,status).subscribe((res:any)=>{
      alert("status updated successfully") 
      this.getAllFeedbacks()
    })
  }
}
