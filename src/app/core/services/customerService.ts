import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Customer {
  customerId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: "root",
})
export class CustomerService {

  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/profile`);
  }

  updateProfile(
    customerId: number,
    data: Partial<Customer>,
  ): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customerId}`, data);
  }

  signup(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/signup`, customerData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/login`, credentials);
  }
}
