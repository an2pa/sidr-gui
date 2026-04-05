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
    <div class="min-h-screen pt-24 lg:pl-64 overflow-hidden scroll-smooth">
      <!-- Hero Section -->
      <section class="px-6 md:px-12 py-16 md:py-32 mb-12 relative">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#3D2B1F]/5 rounded-full blur-3xl -z-10"></div>
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

      <!-- Katalog -->
      <section id="katalog" class="px-6 md:px-12 pb-32">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div class="relative">
            <span class="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block">Premium Katalog</span>
            <h2 class="text-4xl font-serif tracking-tight text-[#111111]">Domaći Hamam</h2>
            <div class="absolute -bottom-4 left-0 w-12 h-1 bg-[#D4AF37]"></div>
          </div>
          
          <div class="flex flex-wrap gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
            <button class="text-[#111111] border-b-2 border-[#D4AF37] pb-2 transition-all">Svi Proizvodi</button>
            <button class="hover:text-[#111111] transition-colors pb-2">Arganovo Ulje</button>
            <button class="hover:text-[#111111] transition-colors pb-2">Ružina Vodica</button>
            <button class="hover:text-[#111111] transition-colors pb-2">Crni Sapun</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-16">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          } @empty {
             <div class="col-span-full py-20 text-center">
               <p class="text-gray-400 font-serif italic tracking-widest uppercase text-[10px]">Otkrivamo tajne ljepote...</p>
             </div>
          }
        </div>
      </section>

      <!-- O Nama - Luksuzna bež/ivory verzija -->
      <section id="o-nama" class="px-6 md:px-12 py-32 bg-[#FAF7F2] text-[#111111] relative">
        <div class="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]/20"></div>
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div class="relative">
             <div class="absolute -top-10 -left-10 w-32 h-32 border-l border-t border-[#D4AF37]/20"></div>
             <span class="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-6 block">Naša Priča</span>
             <h2 class="text-5xl font-serif mb-10 leading-tight">SIDR: Čuvari <br/><span class="italic text-[#D4AF37]">Marokanske Tradicije</span></h2>
             <div class="space-y-6 text-[#111111]/70 font-light leading-relaxed text-lg">
                <p>
                  Od samog osnivanja 2024. godine, SIDR je postao sinonim za autentičnu marokansku kozmetiku na našim prostorima. Naša misija nije samo prodaja, već dijeljenje drevnih rituala ljepote koji su vijekovima čuvani u srcu Magreba.
                </p>
                <p>
                  Danas sa ponosom brojimo stotine zadovoljnih klijenata koji su u našim proizvodima pronašli spas za svoju kožu i kosu. Svaka kap našeg ulja i svako zrno gline nosi sa sobom garanciju čistoće i direktnu povezanost sa marokanskim artisanima.
                </p>
             </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center md:text-left">
             <div class="bg-white p-10 border border-[#D4AF37]/10 hover:shadow-xl transition-all group">
                <span class="text-4xl font-serif text-[#D4AF37] block mb-2">100%</span>
                <span class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Prirodni Sastojci</span>
             </div>
             <div class="bg-white p-10 border border-[#D4AF37]/10 hover:shadow-xl transition-all group">
                <span class="text-4xl font-serif text-[#D4AF37] block mb-2">500+</span>
                <span class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Zadovoljnih Korisnika</span>
             </div>
             <div class="bg-white p-10 border border-[#D4AF37]/10 hover:shadow-xl transition-all group">
                <span class="text-4xl font-serif text-[#D4AF37] block mb-2">2024</span>
                <span class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Godina Osnivanja</span>
             </div>
             <div class="bg-white p-10 border border-[#D4AF37]/10 hover:shadow-xl transition-all group">
                <span class="text-4xl font-serif text-[#D4AF37] block mb-2">Maroko</span>
                <span class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Izvor Autentičnosti</span>
             </div>
          </div>
        </div>

        <!-- Kontakt -->
        <div class="max-w-6xl mx-auto mt-32 pt-20 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-12">
           <div class="text-center md:text-left">
              <span class="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4 block">Kontaktirajte Nas</span>
              <a href="tel:+38762373351" class="text-2xl font-serif hover:text-[#D4AF37] transition-colors">+387 62 373 351</a>
           </div>

           <div class="text-center md:text-right">
              <span class="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4 block">Pratite Naš Ritual</span>
              <a href="https://www.instagram.com/sidr.kozmetika" target="_blank" class="flex items-center gap-4 text-2xl font-serif hover:text-[#D4AF37] transition-all group">
                 <span>@sidr.kozmetika</span>
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
              </a>
           </div>
        </div>
      </section>

      <footer class="px-6 md:px-12 py-12 text-center text-[9px] uppercase tracking-[0.5em] text-gray-400 bg-white">
         © 2024 SIDR KOZMETIKA • SVA PRAVA PRIDRŽANA
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .scroll-smooth { scroll-behavior: smooth; }
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
