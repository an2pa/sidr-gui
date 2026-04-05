import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product, image: File): Observable<Product> {
    const formData = new FormData();
    
    // Create a blob for the product metadata to send as JSON
    const productBlob = new Blob([JSON.stringify(product)], {
      type: 'application/json'
    });
    
    formData.append('product', productBlob);
    formData.append('image', image);

    return this.http.post<Product>(this.apiUrl, formData);
  }
}
