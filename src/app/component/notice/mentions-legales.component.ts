import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './notice.component.css'
})
export class MentionsLegalesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('mentions:refresh'));
  }
}
