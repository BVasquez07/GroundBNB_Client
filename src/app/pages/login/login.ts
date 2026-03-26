import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService, LoginResponse } from "../../core/services/authService";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login implements OnInit {
  email: string = "";
  password: string = "";
  error: string = "";
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["token"]) {
        this.authService.handleOAuthCallback(params);
        const publicId = this.authService.getPublicId();
        this.router.navigate(["/profile", publicId]);
      }
    });
  }

  login() {
    this.loading = true;
    this.error = "";

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response: LoginResponse) => {
          this.authService.setAuthData(response);
          this.router.navigate(["/profile", response.publicId]);
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error || "Invalid email or password";
          this.loading = false;
        },
      });
  }

  signInWithGoogle() {
    this.authService.googleLogin();
  }
}
