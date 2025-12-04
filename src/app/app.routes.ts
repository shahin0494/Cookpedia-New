import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Recipies } from './recipes/recipes';
import { Register } from './register/register';
import { SaveRecipe } from './save-recipe/save-recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';
import { routeGuard } from './guards/route-guard';
import { adminrouteGuard } from './guards/adminroute-guard';

export const routes: Routes = [
    // lazy loaded module path
    {
        path: 'admin', canActivate:[adminrouteGuard],loadChildren: () => import('./admin/admin-module').then(module => module.AdminModule)
    },

    // http://localhost:4200/
    {
        path: "", component: Home, title: "Cookpedia - Home"
    },

    // http://localhost:4200/about
    {
        path: "about", component: About, title: "Cookpedia - About"
    },

    // http://localhost:4200/Contact
    {
        path: "contact", component: Contact, title: "Cookpedia - Contact"
    },

    // http://localhost:4200/Login
    {
        path: "login", component: Login, title: "Cookpedia - Login"
    },

    // http://localhost:4200/profile
    {
        path: "profile",canActivate:[routeGuard], component: Profile, title: "Cookpedia - Profile"
    },

    // http://localhost:4200/Recipes
    {
        path: "recipe", component: Recipies, title: "Cookpedia - Recipes"
    },

    // http://localhost:4200/Register
    {
        path: "register", component: Register, title: "Cookpedia - Register"
    },

    // http://localhost:4200/Save-recipe
    {
        path: "save-recipe", canActivate:[routeGuard],component: SaveRecipe, title: "Cookpedia - Recipes Collection"
    },

    // http://localhost:4200/recipe/:id/view
    {
        path: "recipe/:id/view",canActivate:[routeGuard], component: ViewRecipe, title: "Cookpedia - A Recipe"
    },
    
    // http://localhost:4200/pnf
    {
        path: "**", component: Pnf, title: "Cookpedia - Page Not Found"
    },
];
