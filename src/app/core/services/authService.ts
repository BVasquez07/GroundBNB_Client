import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

export interface LoginResponse {
  token: string;
  publicId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  publicId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/customers`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const publicId = localStorage.getItem("customer_public_id");
    const email = localStorage.getItem("customer_email");
    const firstName = localStorage.getItem("customer_first_name");
    const lastName = localStorage.getItem("customer_last_name");
    const token = localStorage.getItem("jwt_token");

    if (token && publicId) {
      const user: User = {
        publicId,
        email: email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
      };
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    } else {
      this.currentUserSubject.next(null);
      this.isLoggedInSubject.next(false);
    }
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  setAuthData(response: LoginResponse): void {
    localStorage.setItem("jwt_token", response.token);
    localStorage.setItem("customer_public_id", response.publicId);
    localStorage.setItem("customer_email", response.email);
    localStorage.setItem("customer_first_name", response.firstName);
    localStorage.setItem("customer_last_name", response.lastName);

    const user: User = {
      publicId: response.publicId,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      fullName: `${response.firstName} ${response.lastName}`,
    };

    this.currentUserSubject.next(user);
    this.isLoggedInSubject.next(true);
  }

  googleLogin(): void {
    window.location.href = environment.googleOAuthUrl;
  }

  handleOAuthCallback(params: any): void {
    console.log(
      "AuthService - handleOAuthCallback called with params:",
      params,
    );
    if (params.token) {
      const response: LoginResponse = {
        token: params.token,
        publicId: params.publicId,
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
      };
      console.log("AuthService - calling setAuthData with:", response);
      this.setAuthData(response);
    } else {
      console.log("AuthService - no token found in params");
    }
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("customer_public_id");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("customer_first_name");
    localStorage.removeItem("customer_last_name");

    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);

    this.router.navigate(["/login"]);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getPublicId(): string | null {
    return localStorage.getItem("customer_public_id");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  }

  getUserFullName(): string {
    const firstName = localStorage.getItem("customer_first_name");
    const lastName = localStorage.getItem("customer_last_name");
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return firstName || lastName || "User";
  }
}
