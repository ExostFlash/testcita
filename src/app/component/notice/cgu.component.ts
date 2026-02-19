import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cgu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cgu.component.html',
  styleUrl: './notice.component.css'
})
export class CguComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('notice:refresh'));
  }
}
