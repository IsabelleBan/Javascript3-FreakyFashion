import { Routes } from '@angular/router';
import { HomeComponent } from './public/routes/home/home.component';
import { ProductDetailsComponent } from './public/routes/product-details/product-details.component';
import { SearchResultsComponent } from './public/routes/search-results/search-results.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { NewProductsComponent } from './new-products/new-products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/products/new', component: NewProductsComponent },
  { path: '', redirectTo: '/admin/products', pathMatch: 'full' }, // Optional default route
  // Andra routes här
];
