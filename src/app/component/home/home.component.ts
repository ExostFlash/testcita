
import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected count = 0;
  private intervalId: any;
  public elapsedClock: string = '';

  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  ngOnInit() {
    this.updateElapsedClock();
    this.intervalId = setInterval(() => {
      this.count++;
      this.updateElapsedClock();
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateElapsedClock() {
    const totalSeconds = Math.floor(this.count / 2);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    this.elapsedClock = `${h}:${m}:${s}`;
  }

  addTask(title: string) {
    this.taskService.addTask(title);
  }
}