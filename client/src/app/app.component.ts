import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  products: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get('/api/products').subscribe((products) => {
      this.products = products as any[];
      console.log('🔍 Produkter från backend:', this.products);
    });
  }
}


