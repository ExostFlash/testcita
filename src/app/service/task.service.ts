import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = [{id: 1 , title: 'Sample Task'}, {id: 2, title: 'Another Task'}, {id: 3, title: 'More Tasks'}];

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }
}
