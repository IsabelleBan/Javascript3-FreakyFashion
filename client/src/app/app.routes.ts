import { Routes } from '@angular/router';
import { HomeComponent } from './public/routes/home/home.component';
import { ProductDetailsComponent } from './public/routes/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },
  // Fler routes kommer senare
];
