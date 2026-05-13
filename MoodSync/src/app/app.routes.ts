import { Routes } from '@angular/router';

import { UserLayout }
from './layouts/user-layout/user-layout';

import { Dashboard }
from './pages/dashboard/dashboard';

import { CreatePost }
from './pages/create-post/create-post';

import { UserProfile }
from './pages/user-profile/user-profile';

import { Login }
from './pages/login/login';

import { Register }
from './pages/register/register';

import { authGuard }
from './guards/authguard-guard';

export const routes: Routes = [

    /* ---------------- DEFAULT ---------------- */

    {
        path: '',

        redirectTo: 'login',

        pathMatch: 'full'
    },

    /* ---------------- AUTH ---------------- */

    {
        path: 'login',

        component: Login
    },

    {
        path: 'register',

        component: Register
    },

    /* ---------------- USER ---------------- */

    {
        path: 'user',

        component: UserLayout,

        canActivate: [
          authGuard
        ],

        children: [

            {
                path: '',

                redirectTo: 'dashboard',

                pathMatch: 'full'
            },

            {
                path: 'dashboard',

                component: Dashboard
            },

            {
                path: 'create-post',

                component: CreatePost
            },

            {
                path: 'profile',

                component: UserProfile
            }
        ]
    },

    /* ---------------- INVALID ROUTES ---------------- */

    {
        path: '**',

        redirectTo: 'login'
    }
];