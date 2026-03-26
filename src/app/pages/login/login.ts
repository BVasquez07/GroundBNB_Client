import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroImage } from '../../components/hero-image/hero-image';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

interface LoginResponse {
  token: string;
  publicId: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HeroImage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = "";
  password: string = "";
  error: string = "";
  loading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login() {
    this.loading = true;
    this.error = "";

    const loginData = {
      email: this.email,
      password: this.password,
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    this.http
      .post<LoginResponse>(
        "http://localhost:8080/api/customers/login",
        loginData,
        {
          headers: headers,
        },
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem("jwt_token", response.token);
          localStorage.setItem("user_public_id", response.publicId);
          localStorage.setItem("user_email", response.email);
          localStorage.setItem("user_first_name", response.firstName);
          localStorage.setItem("user_last_name", response.lastName);
          console.log(response.publicId);
          this.router.navigate(["/profile", response.publicId]);

          this.loading = false;
        },
        error: (error) => {
          if (error.error) {
            this.error = error.error;
          } else if (error.message) {
            this.error = error.message;
          } else {
            this.error = "Invalid email or password";
          }
          this.loading = false;
        },
      });
  }
}
