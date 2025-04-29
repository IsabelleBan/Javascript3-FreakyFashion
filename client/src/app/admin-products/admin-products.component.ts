import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(
    public http: HttpClient, 
    public router: Router,
    private productService: ProductService // Add ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    document.title = 'Administration';
  }

  // Method to load products
  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Kunde inte hämta produkter:', err);
        this.isLoading = false;
      }
    });
  }
}
