import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: 'full' },

    { path: 'home', loadComponent: () => import('./components/home/home.component').then(x => x.HomeComponent) },
    { path: 'allcategories', loadComponent: () => import('./components/all-categories/all-categories.component').then(x => x.AllCategoriesComponent) },
    { path: 'allproducts', loadComponent: () => import('./components/all-products/all-products.component').then(x => x.AllProductsComponent) },
    { path: 'allsubcategories', loadComponent: () => import('./components/all-sub-categories/all-sub-categories.component').then(x => x.AllSubCategoriesComponent) },
    { path: 'singleproduct', loadComponent: () => import('./components/single-product/single-product.component').then(x => x.SingleProductComponent) },
    { path: 'about', loadComponent: () => import('./components/about/about.component').then(x => x.AboutComponent) },
    {
        path: 'specificCategory/:_id', loadComponent: () => import('./components/specific-category/specific-category.component').then(x => x.SpecificCategoryComponent)
    },
    { path: 'specificSubCategory/:_id', loadComponent: () => import('./components/specific-sub-category/specific-sub-category.component').then(x => x.SpecificSubCategoryComponent) },
    { path: 'subProducts/:_id', loadComponent: () => import('./components/sub-products/sub-products.component').then(x => x.SubProductsComponent) },
    { path: 'productDetails/:_id', loadComponent: () => import('./components/single-product/single-product.component').then(x => x.SingleProductComponent) },
    { path: 'comingsoon', loadComponent: () => import('./components/shared/coming-soon/coming-soon.component').then(x => x.ComingSoonComponent) },
    { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(x => x.ContactComponent) },

    {
        path: "**",
        loadComponent: () => import('./components/shared/error404/error404.component').then(x => x.Error404Component)
    }
];
