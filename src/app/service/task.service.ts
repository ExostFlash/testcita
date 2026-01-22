import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TaskItem {
  id: number;
  title: string;
  validated: boolean;
  highlighted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [
    { id: 1, title: 'Sample Task', validated: false, highlighted: false },
    { id: 2, title: 'Another Task', validated: false, highlighted: false },
    { id: 3, title: 'More Tasks', validated: false, highlighted: false }
  ];
  private nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }

  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: TaskItem = { id: this.nextId++, title: title.trim(), validated: false, highlighted: false };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleValidated(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.validated = !task.validated;
      // Si on valide la tâche, on retire le highlight
      if (task.validated) {
        task.highlighted = false;
      }
      this.tasksSubject.next([...this.tasks]);
    }
  }

  toggleHighlighted(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      // Ne pas permettre de mettre en avant une tâche validée
      if (task.validated) {
        return;
      }
      // Retirer le highlight de toutes les autres tâches
      this.tasks.forEach(t => {
        if (t.id !== id) {
          t.highlighted = false;
        }
      });
      // Toggle le highlight de la tâche actuelle
      task.highlighted = !task.highlighted;
      this.tasksSubject.next([...this.tasks]);
    }
  }
}
