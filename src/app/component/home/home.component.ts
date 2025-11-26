
import { Component } from '@angular/core';
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

  tasks$!: ReturnType<TaskService['getTasks']>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 500);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
