import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if(authService.isLoggedIn()){
    return true;
  } else {
    // Redirect to the login page if not authenticated
    return router.parseUrl('/login');
  }
};
