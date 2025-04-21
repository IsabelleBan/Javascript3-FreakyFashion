import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(data); // Kontrollera datan
        this.products = data;
      },
      error: (error) => console.error('Error fetching products:', error),
    });
  }
}
