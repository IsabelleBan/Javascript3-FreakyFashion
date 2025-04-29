import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css'],
})
export class NewProductsComponent {
  formData: Product = {
    id: 0, // Lägg till ett temporärt id eller ta bort om ditt interface har id?
    name: '',
    description: '',
    image: '',
    brand: '',
    sku: '',
    price: '',
    isNew: 0,
    isFavorite: 0,
    slug: '',
  };

  constructor(private productService: ProductService, private router: Router) {}

  handleSubmit() {
    // Säkerställ att price är en string
    this.formData.price = this.formData.price?.toString() || '';

    console.log('Type of price before sending:', typeof this.formData.price);
    console.log('Value of price before sending:', this.formData.price);

    this.productService.addProduct(this.formData as Product).subscribe({
      next: (response) => {
        console.log('✅ Produkt skapad:', response);
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('❌ Fel vid skapande av produkt:', error);
      },
    });
  }
}


