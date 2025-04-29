import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-similar-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.css',
})
export class SimilarProductsComponent implements OnChanges {
  @Input() currentProductId: number | null = null;

  similarProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnChanges(): void {
    console.log(
      'SimilarProducts: currentProductId changed to',
      this.currentProductId
    );
    if (this.currentProductId) {
      this.loadSimilarProducts();
    }
  }

  loadSimilarProducts(): void {
    if (!this.currentProductId) {
      console.error('Cannot load similar products: currentProductId is null');
      this.error = 'Produkt-ID saknas';
      return;
    }

    this.loading = true;
    this.error = null;

    console.log('Fetching similar products for ID:', this.currentProductId);

    this.productService.getSimilarProducts(this.currentProductId).subscribe({
      next: (data) => {
        console.log('Similar products received:', data);
        this.similarProducts = data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching similar products:', error);
        this.error =
          'Kunde inte ladda liknande produkter: ' +
          (error.message || 'Okänt fel');
        this.loading = false;
      },
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';

    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:8000${imagePath}`;
  }
}
