import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="w-64 fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 pt-24 px-8 hidden lg:block overflow-y-auto">
      <div class="mb-10">
        <h3 class="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">Kategorije</h3>
        <ul class="space-y-4">
          <li><a href="#" class="text-sm hover:text-gold transition-colors font-medium">Arganova Ulja</a></li>
          <li><a href="#" class="text-sm hover:text-gold transition-colors font-medium">Ružina Vodica</a></li>
          <li><a href="#" class="text-sm hover:text-gold transition-colors font-medium">Crni Sapun</a></li>
          <li><a href="#" class="text-sm hover:text-gold transition-colors font-medium">Maske od Gline</a></li>
          <li><a href="#" class="text-sm hover:text-gold transition-colors font-medium">Pribor za Hamam</a></li>
        </ul>
      </div>

      <div class="pt-10 border-t border-gray-100">
        <p class="text-xs text-gray-400 leading-loose italic">
          Doživite vrhunac prirodne njege i bezvremenske ljepote inspirisane marokanskom tradicijom.
        </p>
      </div>
    </aside>
  `,
  styles: [`
    .text-gold { color: #D4AF37; }
  `]
})
export class SidebarComponent {}
