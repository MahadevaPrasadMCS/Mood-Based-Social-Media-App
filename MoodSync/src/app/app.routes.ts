import { Routes } from '@angular/router';
import { UserLayout } from './layouts/user-layout/user-layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';

export const routes: Routes = [
    {
        path: '',
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
