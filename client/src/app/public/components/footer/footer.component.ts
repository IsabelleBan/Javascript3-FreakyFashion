import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterAccordionComponent } from '../footer-accordion/footer-accordion.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FooterAccordionComponent, FooterSectionComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerSections = [
    {
      title: 'Shopping',
      links: ['Vinterjackor', 'Pufferjackor', 'Kappa', 'Trenchcoats'],
    },
    { title: 'Mina Sidor', links: ['Mina Ordrar', 'Mitt Konto'] },
    { title: 'Kundtjänst', links: ['Returnpolicy', 'Integritetspolicy'] },
  ];
}
