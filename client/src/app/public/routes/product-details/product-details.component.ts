import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { SimilarProductsComponent } from '../../components/similar-products/similar-products.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FeatureListComponent } from '../../components/feature-list/feature-list.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SimilarProductsComponent,
    HeaderComponent,
    FooterComponent,
    FeatureListComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Ladda produkten initialt
    this.loadProductBySlug();

    // Lyssna på navigering mellan olika produkter
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Ladda om produktdatan när URL:en ändras
        this.loadProductBySlug();
      });
  }

  loadProductBySlug(): void {
    this.loading = true;
    this.error = null;
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.productService.getProductBySlug(slug).subscribe({
        next: (data) => {
          console.log('Produktdata:', data);
          this.product = data;
          this.titleService.setTitle(data.name);
          this.loading = false;
        },
        error: (error) => {
          console.error('Fel vid hämtning:', error);
          this.error = 'Produkten kunde inte hittas';
          this.loading = false;
        },
      });
    } else {
      this.error = 'Invalid product slug';
      this.loading = false;
    }
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';

    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:8000${imagePath}`;
  }

  addToCart(): void {
    console.log('Lägger i varukorg:', this.product?.name);
    // Implementera varukorgsfunktionalitet här
  }
}
