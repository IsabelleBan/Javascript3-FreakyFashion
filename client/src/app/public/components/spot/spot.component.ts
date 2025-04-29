import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spot',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './spot.component.html',
  styleUrl: './spot.component.css',
})
export class SpotComponent {}
