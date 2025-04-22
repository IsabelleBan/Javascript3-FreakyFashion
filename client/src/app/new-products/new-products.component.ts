import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [FormsModule],  // Importerar FormsModule för template-driven forms
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent {
  formData = {
    name: '',
    description: '',
    image: '',
    brand: '',
    sku: '',
    price: null
  };

  constructor(private http: HttpClient) {}

  // Hantera formulärskickning
  handleSubmit() {
    // Skicka POST-förfrågan till API:t för att skapa en ny produkt
    this.http.post('/api/products', this.formData).subscribe(
      (response) => {
        console.log('Produkt skapad:', response);
        // Lägg till eventuell återkoppling eller navigering här
      },
      (error) => {
        console.error('Fel vid skapande av produkt:', error);
      }
    );
  }
}

