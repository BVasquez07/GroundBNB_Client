import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Listing } from "../../pages/listing/listing";
import {
  ReservationService,
  ReservationRequest,
} from "../../core/services/reservationService";
import { AuthService } from "../../core/services/authService";

@Component({
  selector: "app-booking-widget",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./booking-widget.html",
  styleUrl: "./booking-widget.scss",
})
export class BookingWidget {
  @Input() listing!: Listing;
  @Output() book = new EventEmitter<any>();

  private reservationService = inject(ReservationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  checkInDate: string = "";
  checkOutDate: string = "";
  guests: number = 1;
  nights: number = 0;
  totalPrice: number = 0;
  bookingError: string = "";
  isSubmitting: boolean = false;

  calculateTotalPrice(): number {
    this.bookingError = "";
    this.nights = 0;
    this.totalPrice = 0;

    if (this.checkInDate && this.checkOutDate && this.listing) {
      const start = new Date(this.checkInDate);
      const end = new Date(this.checkOutDate);
      const nights = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (nights <= 0) {
        this.bookingError = "Check-out must be after check-in.";
        return 0;
      }

      this.nights = nights;
      this.totalPrice = nights * this.listing.price;
      return this.nights;
    }
    return 0;
  }

  onBook() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (this.calculateTotalPrice() <= 0) {
      return;
    }

    this.isSubmitting = true;
    this.bookingError = "";

    const reservation: ReservationRequest = {
      listingId: this.listing.publicId,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guests: this.guests,
      totalPrice: this.totalPrice,
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.book.emit(response);
        this.router.navigate(["/profile", this.authService.getPublicId()]);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 401) {
          this.bookingError = "Please login to make a reservation";
        } else {
          this.bookingError =
            error.error?.message || "Failed to create reservation";
        }
      },
    });
  }
}
