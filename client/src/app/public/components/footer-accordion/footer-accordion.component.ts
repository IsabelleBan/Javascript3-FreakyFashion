import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-accordion.component.html',
  styleUrl: './footer-accordion.component.css',
})
export class FooterAccordionComponent {
  accordionData = [
    {
      title: 'Shopping',
      links: ['Vinterjackor', 'Pufferjackor', 'Kappa', 'Trenchcoats'],
    },
    { title: 'Mina Sidor', links: ['Mina Ordrar', 'Mitt Konto'] },
    { title: 'Kundtjänst', links: ['Returnpolicy', 'Integritetspolicy'] },
  ];

  openIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
