import { Routes } from '@angular/router';

import { TasksPageComponent } from '../../component/tasks-page/tasks-page.component';

export const TASKS_ROUTES: Routes = [
  { path: '', component: TasksPageComponent },
];