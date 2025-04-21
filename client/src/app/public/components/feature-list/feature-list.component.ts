import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureItemComponent } from '../feature-item/feature-item.component';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, FeatureItemComponent],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.css',
})
export class FeatureListComponent {
  features = [
    {
      icon: 'http://localhost:8000/svg/globe.svg',
      text: 'Gratis frakt och retur',
    },
    { icon: 'http://localhost:8000/svg/plane.svg', text: 'Expressfrakt' },
    { icon: 'http://localhost:8000/svg/shield.svg', text: 'Säkra betalningar' },
    { icon: 'http://localhost:8000/svg/smiley.svg', text: 'Nyheter varje dag' },
  ];
}
