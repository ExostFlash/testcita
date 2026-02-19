import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-des-cookies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-des-cookies.component.html',
  styleUrl: './notice.component.css'
})
export class GestionDesCookiesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('cookies:refresh'));
  }
}
