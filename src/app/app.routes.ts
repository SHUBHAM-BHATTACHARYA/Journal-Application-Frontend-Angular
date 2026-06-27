import { Routes } from '@angular/router';
import { Journal } from './pages/journal/journal';
import { Login } from './auth/login/login';
import { authGuard } from './auth-guard';
import { Register } from './auth/register/register';
import { JournalAddEditForm } from './pages/journal-add-edit-form/journal-add-edit-form';
import { ResetPassword } from './auth/reset-password/reset-password';

export const routes: Routes = [
    // Triggers ONLY when the URL is strictly empty
    { path: '', redirectTo: 'login', pathMatch: 'full'}, //default route
    
    { 
        path: 'journals', 
        component: Journal,
        canActivate: [authGuard] 
    },
    { path: 'login', component: Login},
    { path: 'register', component: Register},
    { path: 'resetPassword', component: ResetPassword},
    { path: 'journal/addJournal', component: JournalAddEditForm},
    { path: 'journal/editJournal/:id', component: JournalAddEditForm}
];
