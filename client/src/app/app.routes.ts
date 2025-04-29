import { Routes } from '@angular/router';
import { HomeComponent } from './public/routes/home/home.component';
import { ProductDetailsComponent } from './public/routes/product-details/product-details.component';
import { SearchResultsComponent } from './public/routes/search-results/search-results.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      // Barnrutter visas i AdminLayoutComponent
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/new', component: NewProductsComponent },
    ],
  },
];
