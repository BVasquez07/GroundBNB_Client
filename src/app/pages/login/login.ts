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
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
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
          localStorage.setItem("customer_public_id", response.publicId);
          localStorage.setItem("customer_email", response.email);
          localStorage.setItem("customer_first_name", response.firstName);
          localStorage.setItem("customer_last_name", response.lastName);
          this.router.navigate(["/profile", response.publicId]);

          this.loading = false;
        },
        error: (error) => {
          console.log(error);
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
