import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.css',
})
export class FeatureItemComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
}
