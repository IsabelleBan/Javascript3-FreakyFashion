import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FeatureListComponent } from '../../../public/components/feature-list/feature-list.component';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    FeatureListComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Hämta sökparametern från URL:en
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchProducts();
      } else {
        this.loading = false;
        this.products = [];
      }
    });
  }

  searchProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.searchProducts(this.query).subscribe({
      next: (data) => {
        console.log('Sökresultat:', data);
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Fel vid sökning:', error);
        this.error = 'Kunde inte hämta sökresultat';
        this.loading = false;
      },
    });
  }
}
