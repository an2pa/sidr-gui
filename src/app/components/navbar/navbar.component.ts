import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Top Decorative Border (Gold Gradient) -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#111111] via-[#D4AF37] to-[#111111] z-[60]"></div>

    <nav class="fixed top-1 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#3D2B1F]/5 px-6 py-5 flex justify-between items-center transition-all duration-300">
      <div class="flex items-center space-x-10">
        <a routerLink="/" class="text-2xl font-serif font-bold tracking-[0.2em] text-[#111111]">SIDR<span class="text-[#D4AF37]">.</span></a>
        
        <div class="hidden md:flex space-x-8 text-[10px] uppercase tracking-[0.4em] font-bold text-[#111111]/60">
          <a href="/#katalog" class="hover:text-[#D4AF37] transition-all duration-300 relative group">
            Katalog
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="/#o-nama" class="hover:text-[#D4AF37] transition-all duration-300 relative group">
            O Nama
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
      
      <div class="flex items-center space-x-8 text-[#111111]">
        <!-- Search icon -->
        <button class="hover:text-[#D4AF37] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <div class="flex items-center space-x-6">
          @if (authService.isAuthenticated()) {
            @if (authService.isAdmin()) {
              <a routerLink="/admin/create-product" class="text-[9px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] border border-[#D4AF37]/20 px-4 py-2 hover:bg-[#111111] hover:text-white transition-all">Panel</a>
            }
            <button (click)="authService.logout()" class="text-[9px] uppercase tracking-[0.3em] font-bold hover:text-red-600 transition-colors">Odjava</button>
          } @else {
            <a routerLink="/login" class="text-[9px] uppercase tracking-[0.3em] font-bold hover:text-[#D4AF37] transition-colors">Prijava</a>
          }
          
          <!-- Cart Icon -->
          <button class="hover:text-[#D4AF37] transition-colors relative group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-[1.2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
}
