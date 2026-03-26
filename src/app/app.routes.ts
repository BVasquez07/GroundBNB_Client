import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Listing } from './pages/listing/listing';
import { Profile } from './pages/profile/profile';
import { PropertyDetail } from './pages/property-detail/property-detail';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: "", component: Home },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login").then((a) => a.Login),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register").then((a) => a.Register),
  },
  {
    path: "listing",
    loadComponent: () =>
      import("./pages/listing/listing").then((a) => a.Listing),
  },
  {
    path: "profile/:publicId",
    loadComponent: () =>
      import("./pages/profile/profile").then((a) => a.Profile),
    canActivate: [authGuard],
  },
  {
    path: "property/:publicId",
    loadComponent: () =>
      import("./pages/property-detail/property-detail").then(
        (a) => a.PropertyDetail,
      ),
  },
  { path: "**", redirectTo: "/login" },
];
