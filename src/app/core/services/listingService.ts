import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Listing } from "../../pages/listing/listing";

export interface Review {
  id: number;
  rating: number;
  comment: string;
  customerName: string;
  createdAt?: string;
}

@Injectable({
  providedIn: "root",
})
export class ListingService {
  private apiUrl = `${environment.apiUrl}/listings`;

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.apiUrl);
  }

  getListingByPublicId(publicId: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.apiUrl}/${publicId}`);
  }

  getListingsByCity(city: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/city/${city}`);
  }
}
