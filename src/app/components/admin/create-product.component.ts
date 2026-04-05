import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white pt-32 pb-20 px-6 lg:pl-80">
      <div class="max-w-5xl mx-auto lg:mx-0">
        
        <header class="mb-20">
          <div class="flex items-center gap-4 mb-4">
            <div class="h-[1px] w-12 bg-gold"></div>
            <span class="text-[10px] uppercase tracking-[0.4em] font-bold text-gold italic">Administracijski Panel</span>
          </div>
          <h1 class="text-5xl md:text-6xl font-serif text-black leading-none tracking-tight">
            Novi <span class="italic font-normal text-gray-400">Dragulj Maroka</span>
          </h1>
        </header>

        <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="grid grid-cols-1 xl:grid-cols-2 gap-20 items-start">
          
          <!-- LEFT: Media Upload Studio -->
          <div class="space-y-6">
            <label class="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block ml-1">I. Vizualni Identitet</label>
            <div 
              (click)="fileInput.click()"
              (dragover)="$event.preventDefault()"
              (drop)="onFileDropped($event)"
              class="relative aspect-[4/5] bg-[#F9F9F9] border border-gray-100 flex flex-col items-center justify-center cursor-pointer group transition-all duration-1000 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 overflow-hidden"
            >
              <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" class="hidden" />
              
              <div *ngIf="!imagePreview" class="text-center p-12 transition-all duration-700 group-hover:scale-105">
                <div class="w-16 h-16 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-gold/50 group-hover:bg-white transition-all duration-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p class="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold group-hover:text-black transition-colors">Odaberi Fotografiju</p>
                <p class="text-[9px] text-gray-300 mt-2 font-light">Preporučeni omjer: Portret (4:5)</p>
              </div>

              <img *ngIf="imagePreview" [src]="imagePreview" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
          </div>

          <!-- RIGHT: Specifications -->
          <div class="space-y-12">
            <div class="space-y-12">
              <label class="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block ml-1">II. Detalji Proizvoda</label>
              
              <div class="relative group">
                <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-300 group-focus-within:text-gold transition-colors block mb-1">Naziv Autentičnog Proizvoda</span>
                <input 
                  type="text" 
                  name="name" 
                  [(ngModel)]="product.name" 
                  required 
                  class="w-full bg-transparent border-b border-gray-100 py-4 text-2xl font-light focus:outline-none focus:border-black transition-colors"
                  placeholder="npr. Arganovo Ulje - Tečno Zlato"
                />
              </div>

              <div class="grid grid-cols-2 gap-12">
                <div class="relative group">
                  <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-300 group-focus-within:text-gold transition-colors block mb-1">Cijena (KM)</span>
                  <input 
                    type="number" 
                    name="price" 
                    [(ngModel)]="product.price" 
                    required 
                    class="w-full bg-transparent border-b border-gray-100 py-4 text-xl font-light focus:outline-none focus:border-black transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div class="relative group">
                  <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-300 group-focus-within:text-gold transition-colors block mb-1">Kategorija Ponude</span>
                  <input 
                    type="text" 
                    name="category" 
                    [(ngModel)]="product.category" 
                    class="w-full bg-transparent border-b border-gray-100 py-4 text-xl font-light focus:outline-none focus:border-black transition-colors"
                    placeholder="npr. Njega Lica"
                  />
                </div>
              </div>

              <div class="relative group">
                <span class="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-300 group-focus-within:text-gold transition-colors block mb-1">Marokanska Priča (Opis)</span>
                <textarea 
                  name="description" 
                  [(ngModel)]="product.description" 
                  required 
                  rows="4"
                  class="w-full bg-transparent border-b border-gray-100 py-4 text-sm font-light leading-relaxed focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Opišite tradiciju i benefite ovog dragulja..."
                ></textarea>
              </div>
            </div>

            <div class="pt-8">
              <button 
                type="submit" 
                [disabled]="isLoading || !productForm.valid || !selectedFile"
                class="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-gold transition-all duration-700 disabled:opacity-5 group"
              >
                <span class="relative z-10 group-hover:tracking-[0.8em] transition-all duration-700">
                  {{ isLoading ? 'Pohranjivanje...' : 'Sačuvaj u Kolekciju' }}
                </span>
              </button>
              
              <div *ngIf="success" class="mt-8 text-center text-[10px] uppercase tracking-[0.4em] text-green-600 font-bold animate-pulse">
                 Proizvod je uspješno dodan u katalog.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .text-gold { color: #D4AF37; }
    .bg-gold { background-color: #D4AF37; }
  `]
})
export class CreateProductComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: ''
  };

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isLoading = false;
  error = '';
  success = false;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.handleFile(file);
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  private handleFile(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (!this.selectedFile) return;
    this.isLoading = true;
    this.productService.createProduct(this.product, this.selectedFile).subscribe({
      next: () => {
        this.isLoading = false;
        this.success = true;
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: () => {
        this.error = 'Greška prilikom dodavanja proizvoda.';
        this.isLoading = false;
      }
    });
  }
}
