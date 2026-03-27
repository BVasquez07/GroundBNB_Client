import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { ListingData } from "../../pages/listing/listing";

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
  private firstFivePublicIds: string[] = [];

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<ListingData[]> {
    return this.http.get<ListingData[]>(this.apiUrl).pipe(
      tap((listings) => {
        if (listings && listings.length > 0) {
          this.firstFivePublicIds = listings
            .slice(0, 5)
            .map((l) => l.publicId);
        }
      }),
    );
  }

  getListingByPublicId(publicId: string): Observable<ListingData> {
    return this.http.get<ListingData>(`${this.apiUrl}/${publicId}`);
  }

  getListingsByCity(city: string): Observable<ListingData[]> {
    return this.http.get<ListingData[]>(`${this.apiUrl}/city/${city}`);
  }

  getFirstFivePublicIds(): string[] {
    return this.firstFivePublicIds;
  }

  getListingMainImage(publicId: string | undefined, remoteUrl: string): string {
    if (!publicId) return remoteUrl;
    const index = this.firstFivePublicIds.indexOf(publicId);
    if (index !== -1) {
      return `/assets/listings/listing${index + 1}/main.png`;
    }
    return remoteUrl;
  }
}
