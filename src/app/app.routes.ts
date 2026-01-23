import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './components/layout/default-layout/default-layout.component';
//import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Inicio'
        },
/*       {
        path: '404',
        loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
        data: {
            title: 'Page 500'
        }
            */
    },
    {
        path: 'login',
        loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
        data: {
            title: 'Inicio de Sesión'
        }
    },
    {
        path: 'home',
        loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
        data: {
            title: 'Inicio de Sesión'
        }
    },
    { path: '**', redirectTo: 'home' }
]
