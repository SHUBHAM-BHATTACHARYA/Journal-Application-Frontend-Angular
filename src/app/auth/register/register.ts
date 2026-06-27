import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from '../../services/public/public-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = "";

  //Define the options list for the dropdown
  rolesList=[
    {id: 'USER', name: 'user'},
    {id: 'ADMIN', name: 'admin'}
  ]

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email]],
      sentimentAnalysis: [false],
      roles: [[''], [Validators.required]]
    })
  }

  // Getter methods for cleaner template checks
  get username(){
    return this.registerForm.get('username');
  }
  get password(){
    return this.registerForm.get('password');
  }

  get email(){
    return this.registerForm.get("email");
  }

  onSubmit(): void {
    if(this.registerForm.valid){

      //destructuring the username and password
      const { username, password, roles, email, sentimentAnalysis } = this.registerForm.value;
      
      // Extract form values into a clean JSON payload
      const payload = this.registerForm.value;

      console.log(username);
      console.log(password);
      console.log(roles);
      console.log(email);
      console.log(sentimentAnalysis);

      this.publicService.addUser(payload).subscribe({
        next: () => {
          console.log("Register Successful");
          this.router.navigate(['/login']) //redirect to journal
        },
        error: (err: any) =>{
          this.errorMessage = 'Please try again',
          console.log(err)
          this.router.navigate(['/register']);
        }
      });
    } else {

      // Highlight errors if user tries to submit an incomplete form
      this.registerForm.markAllAsTouched();

    }

  }

}
