import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Listing } from './pages/listing/listing';
import { Profile } from './pages/profile/profile';
import { ListingDetail } from './pages/listing-detail/listing-detail';
import { authGuard } from './core/guards/auth-guard';
import { Bookings } from './pages/bookings/bookings';

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
    path: "profile",
    loadComponent: () =>
      import("./pages/profile/profile").then((a) => a.Profile),
    // canActivate: [authGuard],
  },
  {
    path: "listingDetail/:id",
    loadComponent: () =>
      import("./pages/listing-detail/listing-detail").then(
        (a) => a.ListingDetail,
      ),
  },
  {
    path: "booking",
    loadComponent: () =>
      import("./pages/bookings/bookings").then(
        (a) => a.Bookings,
      ),
  },
  { path: "**", redirectTo: "/login" },
];
