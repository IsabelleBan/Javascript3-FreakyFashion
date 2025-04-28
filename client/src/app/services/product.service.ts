import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definiera en modell för produktens data (valfritt men rekommenderat)
export interface Product {
    id?: number;
    name: string;
    price: string | null;
    description: string;
    image: string;
    brand: string;
    sku: string;
  }

@Injectable({
  providedIn: 'root', // Gör servicen tillgänglig i hela appen
})
export class ProductService {
  private apiUrl = '/api/products'; // Din API-URL för produkter

  constructor(private http: HttpClient) {}

  // Hämta alla produkter
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); // GET-anrop till backend
  }

  // Skapa en ny produkt
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product); // POST-anrop för att skapa en ny produkt
  }
}


