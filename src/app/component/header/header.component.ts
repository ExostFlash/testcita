
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  constructor(public router: Router) {}

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('header:refresh'));
  }

  isHomeActive(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
