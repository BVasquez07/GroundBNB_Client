import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import {Listing} from './pages/listing/listing';
import {Profile} from './pages/profile/profile';
import {PropertyDetail} from './pages/property-detail/property-detail';



export const routes: Routes = [
    {
        path: '',
        component: Home
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
        path: 'listing',
        component: Listing
    },
    {
        path: 'profile/:userId',
        component: Profile
    },
    {
        path: 'property/:id',
        component: PropertyDetail
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
