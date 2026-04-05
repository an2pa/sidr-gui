import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group cursor-pointer">
      <!-- Arched Container (Deep Tones) -->
      <div class="relative overflow-hidden aspect-[4/5] bg-[#3D2B1F]/5 mb-8 rounded-t-full transition-all duration-1000 group-hover:shadow-2xl group-hover:shadow-[#111111]/10 border border-transparent group-hover:border-[#D4AF37]/20">
        
        <!-- Badge (Gold Accent) -->
        <div class="absolute top-6 left-6 z-10">
          <span class="bg-[#111111]/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] border-l-2 border-[#D4AF37]">Novo</span>
        </div>

        <img 
          [src]="product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'" 
          [alt]="product.name"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
        />
        
        <!-- Elegant Overlay (Black to Transparent) -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div class="absolute inset-0 flex flex-col items-center justify-end pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
             <button class="bg-[#D4AF37] text-white px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#111111] transition-all duration-300 shadow-2xl">
               Otkrij Detalje
             </button>
          </div>
        </div>

        <!-- Add to Cart Quick Action (Gold Strip) -->
        <button class="absolute bottom-0 left-0 right-0 h-2 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></button>
      </div>

      <div class="space-y-4 text-center">
        <div class="flex flex-col items-center gap-2">
          <p class="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold bg-[#D4AF37]/5 px-3 py-1 rounded-full">{{product.category || 'Esencija'}}</p>
          <h3 class="text-lg font-serif italic text-[#111111] group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">{{product.name}}</h3>
        </div>
        <div class="h-[1px] w-8 bg-[#3D2B1F]/10 mx-auto"></div>
        <p class="text-sm font-medium tracking-widest text-[#111111]">{{product.price}} KM</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  handleImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop';
  }
}
