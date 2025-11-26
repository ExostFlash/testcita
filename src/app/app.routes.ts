import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },

    {
        path: 'tasks',
        loadChildren: () => import('./module/task/task.component').then(m => m.TASKS_ROUTES)
    },

    {
        path: 'about',
        loadChildren: () => import('./module/about/about.component').then(m => m.ABOUT_ROUTES)
    }
];
