import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './politique-confidentialite.component.html',
  styleUrl: './notice.component.css'
})
export class PolitiqueConfidentialiteComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('politique:refresh'));
  }
}