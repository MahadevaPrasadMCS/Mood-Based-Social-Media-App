import { Routes } from '@angular/router';
import { UserLayout } from './layouts/user-layout/user-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
        {
            path: '',
            component: Login
        },
        {
            path: 'login',
            component: Login
        },
        {
            path: 'register',
            component: Register
        },
        {
            path: 'user',
            component: UserLayout,
            children: [
                {
                    path: 'dashboard',
                    component: Dashboard
                },
                {
                    path: 'create-post',
                    component: CreatePost
                }
            ]
        }
];
