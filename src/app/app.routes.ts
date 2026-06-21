import { Routes } from '@angular/router';
import { Journal } from './component/journal/journal';
import { Login } from './auth/login/login';
import { authGuard } from './auth-guard';
import { Register } from './auth/register/register';

export const routes: Routes = [
    // Triggers ONLY when the URL is strictly empty
    { path: '', redirectTo: 'login', pathMatch: 'full'}, //default route
    
    { 
        path: 'journals', 
        component: Journal,
        canActivate: [authGuard] 
    },
    { path: 'login', component: Login},
    { path: 'register', component: Register}
];
