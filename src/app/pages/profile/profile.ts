import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AuthService, User } from "../../core/services/authService";
import {
  ReservationService,
  Reservation,
} from "../../core/services/reservationService";
import { ListingService } from "../../core/services/listingService";
import { Listing } from "../listing/listing";

interface Review {
  id: number;
  rating: number;
  comment: string;
  listingTitle: string;
  createdAt: string;
}

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./profile.html",
  styleUrl: "./profile.scss",
})
export class Profile implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private reservationService = inject(ReservationService);
  private listingService = inject(ListingService);

  user: User | null = null;
  reservations: Reservation[] = [];
  reviews: Review[] = [];
  listings: Listing[] = [];

  loadingReservations: boolean = true;
  loadingReviews: boolean = true;
  loadingListings: boolean = true;

  ngOnInit() {
    const publicId = this.route.snapshot.paramMap.get("publicId");
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.publicId === publicId) {
      this.user = currentUser;
      this.loadUserData();
    } else {
      this.loadingReservations = false;
      this.loadingReviews = false;
      this.loadingListings = false;
    }
  }

  loadUserData() {
    this.loadReservations();
    this.loadReviews();
    this.loadListings();
  }

  loadReservations() {
    this.reservationService.getUserReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loadingReservations = false;
      },
      error: (err) => {
        console.error("Error loading reservations:", err);
        this.loadingReservations = false;
      },
    });
  }

  loadReviews() {
    // TODO: Implement reviews endpoint
    // For now using sample data
    this.reviews = [];
    this.loadingReviews = false;
  }

  loadListings() {
    this.listingService.getAllListings().subscribe({
      next: (data) => {
        this.listings = data;
        this.loadingListings = false;
      },
      error: (err) => {
        console.error("Error loading listings:", err);
        this.loadingListings = false;
      },
    });
  }

  getStars(rating: number): number[] {
    return new Array(Math.floor(rating));
  }

  cancelReservation(reservationId: number) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      // TODO: Implement cancel reservation API
      console.log("Cancel reservation:", reservationId);
    }
  }
}
