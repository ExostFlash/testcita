import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-don',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './don.component.html',
  styleUrl: './don.component.css'
})
export class DonComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('don:refresh'));
  }
}
