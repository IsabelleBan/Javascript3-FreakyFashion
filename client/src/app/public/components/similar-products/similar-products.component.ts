import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProductId'] && this.currentProductId) {
      this.loadSimilarProducts();
    }
  }

  loadSimilarProducts(): void {
    if (!this.currentProductId) return;

    this.loading = true;
    this.productService.getSimilarProducts(this.currentProductId).subscribe({
      next: (data) => {
        console.log('Similar products:', data);
        this.similarProducts = data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching similar products:', error);
        this.error = 'Kunde inte ladda liknande produkter';
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
