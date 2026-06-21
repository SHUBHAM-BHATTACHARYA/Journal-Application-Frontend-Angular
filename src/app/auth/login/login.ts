import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder, //Inject the FormBuilder
    private router: Router, //Inject the Angular Router
    private authService: AuthService //Inject the Auth Service
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

      console.log(username);
      console.log(password);

      this.authService.login(username, password).subscribe({
        next: () => {
          console.log("Login Successful");
          this.router.navigate(['/journals']) //redirect to journal
        },
        error: (err) =>{
          this.errorMessage = 'Invalid credentials. Please try again',
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
