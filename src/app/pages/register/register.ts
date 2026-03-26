import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/authService";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrls: ["./register.scss"],
})
export class Register {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  loading: boolean = false;
  error: string = "";
  success: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  register() {
    this.error = "";
    this.success = "";

    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.error = "All fields are required";
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = "Passwords do not match";
      return;
    }

    if (this.password.length < 6) {
      this.error = "Password must be at least 6 characters";
      return;
    }

    this.loading = true;

    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.http
      .post("http://localhost:8080/api/customers/signup", registerData)
      .subscribe({
        next: (response) => {
          this.success = "Registration successful! Redirecting to login...";
          this.loading = false;

          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.password = "";
          this.confirmPassword = "";

          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        error: (error) => {
          this.error =
            error.error?.message || "Registration failed. Please try again.";
          this.loading = false;
        },
      });
  }

  signInWithGoogle() {
    this.authService.googleLogin();
  }
}
