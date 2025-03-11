import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authenticatedGuard] },
    { path: '**', redirectTo: '/login' }
];
