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

    // För felsökning - logga sökvägen
    console.log('Image path:', imagePath);

    // Om bildsökvägen börjar med http, använd den direkt
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Konstruera korrekt URL till servern
    return `http://localhost:8000${imagePath}`;
  }
}
