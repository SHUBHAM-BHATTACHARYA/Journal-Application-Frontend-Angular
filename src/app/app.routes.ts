import { Routes } from '@angular/router';
import { Journal } from './component/journal/journal';
import { Login } from './auth/login/login';

export const routes: Routes = [
    // Triggers ONLY when the URL is strictly empty
    { path: '', redirectTo: 'login', pathMatch: 'full'}, //default route
    
    { path: 'journals', component: Journal },
    { path: 'login', component: Login}
];
