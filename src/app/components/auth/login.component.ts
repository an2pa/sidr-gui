import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-white px-6">
      <div class="max-w-md w-full">
        <div class="text-center mb-12">
          <h1 class="text-3xl font-serif mb-2 tracking-tight text-black">Dobrodošli Nazad</h1>
          <p class="text-sm text-gray-400 font-light tracking-wide uppercase">Nastavite svoj ritual prirodne ljepote</p>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-8">
          <div class="space-y-6">
            <div class="relative group">
              <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">E-mail Adresa</label>
              <input 
                type="email" 
                name="email" 
                [(ngModel)]="request.email" 
                required 
                class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
                placeholder="vas@email.com"
              />
            </div>

            <div class="relative group">
              <label class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 block group-focus-within:text-gold transition-colors">Lozinka</label>
              <input 
                type="password" 
                name="password" 
                [(ngModel)]="request.password" 
                required 
                class="w-full bg-transparent border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-black transition-colors font-light"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] uppercase tracking-widest font-bold">
             <a href="#" class="text-gray-400 hover:text-black transition-colors">Zaboravili ste lozinku?</a>
          </div>

          <button 
            type="submit" 
            [disabled]="isLoading"
            class="w-full bg-black text-white py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Provjera podataka...' : 'Prijavi Se' }}
          </button>

          <p class="text-center text-xs text-gray-400 font-light">
            Nemate račun? 
            <a routerLink="/register" class="text-black font-bold hover:text-gold transition-colors ml-1 uppercase tracking-widest">Registrujte se</a>
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
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  request = { email: '', password: '' };
  isLoading = false;
  error = '';

  onSubmit(): void {
    this.isLoading = true;
    this.error = '';
    
    this.authService.login(this.request).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = 'Neispravni podaci. Molimo pokušajte ponovo.';
        this.isLoading = false;
        console.error('Login failed', err);
      }
    });
  }
}
