import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import {Listing} from './pages/listing/listing';
import {Profile} from './pages/profile/profile';
import {PropertyDetail} from './pages/property-detail/property-detail';
import { authGuard } from './core/guards/auth-guard';



export const routes: Routes = [
  { path: "", component: Home },
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "listing", component: Listing },
  { path: "profile/:publicId", component: Profile, canActivate: [authGuard] },
  { path: "property/:publicId", component: PropertyDetail },
  { path: "**", redirectTo: "/login" },
];
