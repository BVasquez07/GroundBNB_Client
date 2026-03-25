import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router: Router) {}  

  onLogin (userPayload: {user: string, password: string}):void {
    // Simulate successful login and navigate to the home page
    this.router.navigate(['/']);
  }
}12
