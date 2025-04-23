import { Routes } from '@angular/router';
import { HomeComponent } from './public/routes/home/home.component';
import { ProductDetailsComponent } from './public/routes/product-details/product-details.component';
import { SearchResultsComponent } from './public/routes/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  // Andra routes här
];
