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
    id: 0,
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

    // Generera en slug baserad på produktnamnet om den saknas
    if (!this.formData.slug || this.formData.slug === '') {
      this.formData.slug = this.generateSlug(this.formData.name);
    }

    console.log('Type of price before sending:', typeof this.formData.price);
    console.log('Value of price before sending:', this.formData.price);
    console.log('Slug for new product:', this.formData.slug);

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

  // Hjälpfunktion för att generera en slug
  private generateSlug(name: string): string {
    // Ersätt mellanslag med bindestreck och ta bort specialtecken
    let slug = name
      .toLowerCase()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^\w\s-]/g, '') // Ta bort specialtecken
      .replace(/\s+/g, '-') // Ersätt mellanslag med bindestreck
      .replace(/-+/g, '-'); // Ta bort upprepade bindestreck

    return slug;
  }
}
