import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  public authService = inject(AuthService);

  // Directly expose the signal to the HTML template
  username = this.authService.currentUsername; 


  onLogout(){
    this.authService.logout();
  }

}
