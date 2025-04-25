import { Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { NewProductsComponent } from './new-products/new-products.component';

export const routes: Routes = [
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/products/new', component: NewProductsComponent },
  { path: '', redirectTo: '/admin/products', pathMatch: 'full' }, // Optional default route
];