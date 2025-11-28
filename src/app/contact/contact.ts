import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [Header, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  api = inject(ApiService)
  name: string = ""
  email: string = ""
  message: string = ""

  addFeedback() {
    if (this.name != "" || this.email != "" || this.message != ""){ this.api.addFeedBackAPI({ name: this.name, email: this.email, message: this.message }).subscribe((res: any) => {
      console.log(res);
      
        alert(res)
        this.name=""
        this.email=""
        this.message=""
      })
    }else {
      alert("Please fill the form completely")
    }
     
  }

}
