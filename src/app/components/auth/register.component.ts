import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white px-6">
      <div class="max-w-md w-full">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-serif mb-2 tracking-tight text-black">Join SIDR</h1>
          <p class="text-sm text-gray-400 font-light tracking-wide uppercase">Create an account to experience the pinnacle of luxury</p>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="relative group">
              <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">First Name</label>
              <input 
                type="text" 
                name="firstname" 
                [(ngModel)]="request.firstname" 
                required 
                class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
                placeholder="John"
              />
            </div>
            <div class="relative group">
              <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">Last Name</label>
              <input 
                type="text" 
                name="lastname" 
                [(ngModel)]="request.lastname" 
                required 
                class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
                placeholder="Doe"
              />
            </div>
          </div>

          <div class="relative group">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">Email Address</label>
            <input 
              type="email" 
              name="email" 
              [(ngModel)]="request.email" 
              required 
              class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
              placeholder="email@example.com"
            />
          </div>

          <div class="relative group">
            <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">Password</label>
            <input 
              type="password" 
              name="password" 
              [(ngModel)]="request.password" 
              required 
              class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            [disabled]="isLoading"
            class="w-full bg-black text-white py-5 mt-8 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>

          <p class="text-center text-xs text-gray-400 font-light">
            Already have an account? 
            <a routerLink="/login" class="text-black font-bold hover:text-gold transition-colors ml-1 uppercase tracking-widest">Sign In</a>
          </p>
        </form>

        <div *ngIf="error" class="mt-6 text-center text-xs text-red-500 font-medium tracking-wide italic">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .text-gold { color: #D4AF37; }
    .bg-gold { background-color: #D4AF37; }
  `]
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  request = { firstname: '', lastname: '', email: '', password: '', role: 'USER' };
  isLoading = false;
  error = '';

  onSubmit(): void {
    this.isLoading = true;
    this.error = '';
    
    this.authService.register(this.request).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = 'Registration failed. Please check your details.';
        this.isLoading = false;
        console.error('Registration failed', err);
      }
    });
  }
}
