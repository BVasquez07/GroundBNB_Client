import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface ReservationRequest {
  listingId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
}

export interface Reservation {
  id: number;
  listingTitle: string;
  listingImageUrl: string;
  listingPublicId?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) {}

  createReservation(reservation: ReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }
}
