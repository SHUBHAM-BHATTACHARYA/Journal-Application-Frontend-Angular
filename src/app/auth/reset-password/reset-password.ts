import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PublicService } from '../../services/public/public-service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  loginForm: FormGroup;
    errorMessage: string = "";
  
    constructor(
      private fb: FormBuilder, //Inject the FormBuilder
      private router: Router, //Inject the Angular Router
      private publicService: PublicService, //Inject the Auth Service
    ){
      // Initialize form controls with validation rules
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      });
    }
  
    
  
    // Getter methods for cleaner template checks
    get username(){
      return this.loginForm.get('username');
    }
    get password(){
      return this.loginForm.get('password');
    }
  
  
    onSubmit(): void {
      if(this.loginForm.valid){
  
        //destructuring the username and password
        const { username, password } = this.loginForm.value;
        const payload = this.loginForm.value;
  
        console.log(username);
        console.log(password);
  
        this.publicService.resetPassword(username, payload).subscribe({
          next: () => {
            console.log("Password Reset Successful");
            this.router.navigate(['/login']) //redirect to journal
          },
          error: (err) =>{
            this.errorMessage = 'Please try again',
            console.log(err)
            this.router.navigate(['/']);
          }
        });
  
      } else {
  
        // Highlight errors if user tries to submit an incomplete form
        this.loginForm.markAllAsTouched();
  
      }
  
    }
}
