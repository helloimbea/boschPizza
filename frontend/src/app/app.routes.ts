import { Routes } from '@angular/router';
import { AccessDenied } from './features/auth/pages/access-denied/access-denied';
import { Login } from './features/auth/pages/login/login';
import { MainLayout } from './layout/components/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/dashboard/pages/home/home';
import { Pizza } from './core/services/pizza';
import { PizzaForm } from './features/pizzas/pages/pizza-form/pizza-form';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'acesso-negado', component: AccessDenied } ,
    {
        path: '',
        component: MainLayout, 
        canActivate: [authGuard],
        children: [
            { path: 'home', component: Home },
            { path: 'pizza', component: Pizza },
            { path: 'pizza/novo', component: PizzaForm },
            { path: 'pizza/editar/:id', component: PizzaForm }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
