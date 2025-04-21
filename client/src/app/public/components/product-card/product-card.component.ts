import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Product | undefined;

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';

    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:8000${imagePath}`;
  }
}
