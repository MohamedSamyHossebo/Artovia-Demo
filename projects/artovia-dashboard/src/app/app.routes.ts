import { Routes } from '@angular/router';
import { authGuard } from './services/authGuard/auth.guard';
import { redirectIfAuth } from './services/authGuard/redirect-if.guard';


export const routes: Routes = [
    { path: '', redirectTo: "dashboard-categories", pathMatch: 'full' },

    {
        path: "login",
        canActivate: [redirectIfAuth], // تغيير إلى canActivate مع Guard جديد
        loadComponent: () => import('./auth/login/login.component').then(x => x.LoginComponent)
    },
    {
        path: "forget-password",
        canActivate: [redirectIfAuth], // تغيير إلى canActivate مع Guard جديد
        loadComponent: () => import('./auth/forgetpassword/forgetpassword.component').then(x => x.ForgetpasswordComponent)
    },
    {
        path: "signup",
        canActivate: [authGuard],
        loadComponent: () => import('./auth/signup/signup.component').then(x => x.SignupComponent)
    },
    {
        path: "dashboard-categories",
        canActivate: [authGuard],
        loadComponent: () => import('./categories/categories.component').then(x => x.CategoriesComponent)
    },
    {
        path: "dashboard-sub-categories",
        canActivate: [authGuard],
        loadComponent: () => import('./sub-categories/sub-categories.component').then(x => x.SubCategoriesComponent)
    },
    {
        path: "dashboard-all-products",
        canActivate: [authGuard],

        loadComponent: () => import('./shared/all-products/all-products.component').then(x => x.AllProductsComponent)
    },
    {
        path: 'dashboard-profile',
        canActivate: [authGuard],

        loadComponent: () => import('./profile/profile.component').then(x => x.ProfileComponent)
    },
    {
        path: 'dashboard-logout',
        canActivate: [authGuard],

        loadComponent: () => import('./auth/login/login.component').then(x => x.LoginComponent)
    },




    {
        path: "**",
        loadComponent: () => import('./shared/error/error.component').then(x => x.ErrorComponent)
    }
];
