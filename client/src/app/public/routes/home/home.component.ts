import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../../public/components/hero/hero.component';
import { SpotComponent } from '../../../public/components/spot/spot.component';
import { ProductGridComponent } from '../../../public/components/product-grid/product-grid.component';
import { FeatureListComponent } from '../../../public/components/feature-list/feature-list.component';
import { FooterComponent } from '../../../public/components/footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    SpotComponent,
    ProductGridComponent,
    FeatureListComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Dynamiskt innehåll för hero-komponenten
  heroTitle: string = 'Välkommen till Freaky Fashion';
  heroText: string = 'Upptäck vår nya kollektion för säsongen!';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Freaky Fashion');
  }
}
