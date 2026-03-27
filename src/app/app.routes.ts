import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { authGuard } from "./core/guards/auth-guard";
import { guestGuard } from "./core/guards/guest-guard";

export const routes: Routes = [
  { path: "", component: Home },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login").then((a) => a.Login),
    canActivate: [guestGuard],
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
    path: "listing/:publicId",
    loadComponent: () =>
      import("./pages/listing-detail/listing-detail").then(
        (a) => a.ListingDetail,
      ),
  },
  {
    path: "profile/:publicId",
    loadComponent: () =>
      import("./pages/profile/profile").then((a) => a.Profile),
    canActivate: [authGuard],
  },
  {
    path: "booking",
    loadComponent: () =>
      import("./pages/bookings/bookings").then((a) => a.Bookings),
  },
  { path: "**", redirectTo: "/login" },
];
