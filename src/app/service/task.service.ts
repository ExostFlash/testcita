import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TaskItem {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [
    { id: 1, title: 'Sample Task' },
    { id: 2, title: 'Another Task' },
    { id: 3, title: 'More Tasks' }
  ];
  private nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }

  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: TaskItem = { id: this.nextId++, title: title.trim() };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }
}
