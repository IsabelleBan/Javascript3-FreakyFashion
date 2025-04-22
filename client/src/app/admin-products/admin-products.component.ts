import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // För att göra HTTP-anrop
import { Router } from '@angular/router'; // För att hantera navigationen
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = true;
  
  constructor(public http: HttpClient, public router: Router) {}

  ngOnInit(): void {
    // Hämta produkter från API:t när komponenten laddas
    this.http.get<any[]>('/api/admin/products')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Kunde inte hämta produkter:', err);
          this.isLoading = false;
        }
      });

    // Uppdatera dokumentets titel
    document.title = 'Administration';
  }
}
