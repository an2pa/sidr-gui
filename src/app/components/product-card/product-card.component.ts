import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group cursor-pointer max-w-[240px] mx-auto">
      <div class="relative overflow-hidden aspect-[4/5] bg-gray-50 mb-4 rounded-t-full transition-all duration-700 group-hover:shadow-2xl border border-transparent group-hover:border-[#D4AF37]/20">
        
        <img 
          [src]="getFullImageUrl(product.imageUrl)" 
          [alt]="product.name"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        <!-- Overlay sa tipkom za korpu -->
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
             <button class="bg-[#111111] text-white px-6 py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] transition-all duration-300 shadow-2xl">
               Dodaj u korpu
             </button>
        </div>
      </div>

      <div class="space-y-3 text-center">
        <div class="flex flex-col items-center gap-1.5">
          <p class="text-[7px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">{{product.category || 'Esencija'}}</p>
          <h3 class="text-sm font-serif italic text-[#111111] leading-tight">{{product.name}}</h3>
        </div>
        <p class="text-xs font-medium tracking-widest text-[#111111]">{{product.price}} KM</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  getFullImageUrl(url: string | undefined): string {
    const defaultImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop';
    
    if (!url) return defaultImage;
    
    // If URL is relative (starts with /uploads/), prepend the backend URL
    if (url.startsWith('/uploads/')) {
      return `${environment.baseUrl}${url}`;
    }
    
    // If it's the old hardcoded localhost URL, replace it with the backend URL
    if (url.includes('localhost:8080')) {
      return url.replace('http://localhost:8080', environment.baseUrl);
    }
    
    return url;
  }

  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop';
  }
}
