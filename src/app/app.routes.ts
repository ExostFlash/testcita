import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DonComponent } from './component/don/don.component';
import { ContactComponent } from './component/contact/contact.component';
import { MentionsLegalesComponent } from './component/notice/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './component/notice/politique-confidentialite.component';
import { GestionDesCookiesComponent } from './component/notice/gestion-des-cookies.component';
import { CguComponent } from './component/notice/cgu.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Accueil' },
	{ path: 'home', component: HomeComponent, title: 'Accueil' },
    { path: 'don', component: DonComponent, title: 'Don' },
	{ path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'mentions-legales', component: MentionsLegalesComponent, title: 'Mentions légales' },
    { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent, title: 'Politique de confidentialité' },
    { path: 'gestion-des-cookies', component: GestionDesCookiesComponent, title: 'Gestion des cookies' },
    { path: 'cgu', component: CguComponent, title: 'CGU' },
    { path: '**', component: NotFoundComponent, title: '404' },
/* 
    {
        path: 'about',
        loadChildren: () => import('./module/about/about.component').then(m => m.ABOUT_ROUTES)
    } */
];
