import { Routes } from '@angular/router';
import { AccessDenied } from './features/auth/pages/access-denied/access-denied';
import { Login } from './features/auth/pages/login/login';
import { MainLayout } from './layout/components/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/dashboard/pages/home/home';
import { PizzaService } from './core/services/pizza.service';
import { PizzaForm } from './features/pizzas/pages/pizza-form/pizza-form';
import { PizzaList } from './features/pizzas/pages/pizza-list/pizza-list';
import { Clientes } from './features/clientes/clientes';
import { ClienteForm } from './features/clientes/cliente-form/cliente-form';
import { Register } from './features/auth/pages/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'acesso-negado', component: AccessDenied } ,
    {
        path: '',
        component: MainLayout, 
        canActivate: [authGuard],
        children: [
            { path: 'home', component: Home },
            { path: 'pizzas', component: PizzaList },
            { path: 'pizzas/novo', component: PizzaForm },
            { path: 'pizzas/editar/:id', component: PizzaForm },
            { path: 'cliente', component: Clientes },
            { path: 'cliente/novo', component: ClienteForm },
            { path: 'cliente/editar/:id', component: ClienteForm }
        ]
    },
    
    { path: '**', redirectTo: 'acesso-negado' }
];
