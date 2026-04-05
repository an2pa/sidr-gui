import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="min-h-screen pt-24 lg:pl-64 overflow-hidden">
      <!-- Hero Section: Black, Gold, and Brown -->
      <section class="px-6 md:px-12 py-16 md:py-32 mb-12 relative">
        
        <!-- Oriental Background Element (Warm Tones) -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#3D2B1F]/5 rounded-full blur-3xl -z-10"></div>
        <div class="absolute top-40 right-20 w-64 h-96 border border-[#D4AF37]/30 rounded-t-full hidden xl:block -z-10 animate-pulse"></div>

        <div class="max-w-4xl relative">
          <div class="absolute -top-12 -left-4 text-[120px] font-serif text-[#111111]/5 -z-20 select-none tracking-[0.2em] uppercase">MOROCCO</div>
          
          <div class="flex items-center gap-4 mb-8">
             <div class="h-[1px] w-12 bg-[#D4AF37]"></div>
             <span class="text-xs uppercase tracking-[0.4em] font-extrabold text-[#D4AF37]">Autentični Ritual Ljepote</span>
          </div>

          <h1 class="text-6xl md:text-8xl font-serif font-light leading-none mb-10 tracking-tighter text-[#111111]">
            <span class="text-[#3D2B1F]">Zlato iz</span> <br/> 
            <span class="italic font-normal text-[#D4AF37]">Pustinjskog Pijeska</span>
          </h1>
          
          <div class="h-[1px] w-32 bg-[#D4AF37] mb-10"></div>
          
          <p class="text-xl text-[#3D2B1F]/80 font-light max-w-xl leading-relaxed italic border-l-2 border-[#D4AF37]/40 pl-6">
            "Najčistija esencija Maroka, rođena u srcu Atlasa. Otkrijte rituale ljepote koji se prenose generacijama, sada dostupni u Vašem domu."
          </p>
        </div>
      </section>

      <!-- Product Grid Section -->
      <section class="px-6 md:px-12 pb-32">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div class="relative">
            <span class="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block">Premium Katalog</span>
            <h2 class="text-4xl font-serif tracking-tight text-[#111111]">Domaći Hamam</h2>
            <div class="absolute -bottom-4 left-0 w-12 h-1 bg-[#D4AF37]"></div>
          </div>
          
          <div class="flex flex-wrap gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
            <button class="text-[#111111] border-b-2 border-[#D4AF37] pb-2 transition-all">Svi Proizvodi</button>
            <button class="hover:text-[#3D2B1F] transition-colors pb-2">Arganovo Ulje</button>
            <button class="hover:text-[#3D2B1F] transition-colors pb-2">Ružina Vodica</button>
            <button class="hover:text-[#3D2B1F] transition-colors pb-2">Crni Sapun</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          } @empty {
             <div class="col-span-full py-20 text-center">
               <div class="w-16 h-16 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div class="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping"></div>
               </div>
               <p class="text-gray-400 font-serif italic tracking-widest uppercase text-[10px]">Otkrivamo tajne ljepote...</p>
             </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error fetching products', err)
    });
  }
}
