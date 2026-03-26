import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      responseType: "text",
    });
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
  }

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
