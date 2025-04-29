import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products'; // Ändra till korrekt URL och endpoint

  constructor(private http: HttpClient) {}
 
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
 
  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${slug}`);
  }
 
  getSimilarProducts(productId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/similar?id=${productId}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8000/search?q=${query}`);
  }

  // Skapa en ny produkt
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `http://localhost:8000/api/products`,
      product
    );
  }
}
