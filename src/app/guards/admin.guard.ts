import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AdminGuard Check:', {
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
    token: authService.getToken()
  });

  if (authService.isAdmin()) {
    return true;
  }

  // If not admin, redirect to home or access denied page
  router.navigate(['/']);
  return false;
};
