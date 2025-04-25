import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../services/product.service'; // Adjust import path if needed

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent {
  formData: Product = {
    name: '',
    description: '',
    image: '',
    brand: '',
    sku: '',
    price: 0 // Initialize with 0 instead of null
  };

  constructor(
    private productService: ProductService,
    private router: Router // Add router for navigation
  ) {}

  handleSubmit() {
    this.productService.addProduct(this.formData).subscribe({
      next: (response) => {
        console.log('✅ Produkt skapad:', response);
        // Navigate back to products page after successful creation
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('❌ Fel vid skapande av produkt:', error);
      }
    });
  }
}


