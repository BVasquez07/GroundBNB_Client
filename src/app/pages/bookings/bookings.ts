import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  ReservationService,
  ReservationRequest,
} from "../../core/services/reservationService";
import { ListingService } from "../../core/services/listingService";
import { AuthService } from "../../core/services/authService";
import { Listing } from "../listing/listing";

@Component({
  selector: "app-bookings",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./bookings.html",
  styleUrl: "./bookings.scss",
})
export class Bookings implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservationService = inject(ReservationService);
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  bookingForm!: FormGroup;

  checkInDate: string = "";
  checkOutDate: string = "";
  guests: number = 1;
  listingId: string = "";
  listing: Listing | null = null;
  price: number = 0;
  numberOfNights: number = 0;
  totalPrice: number = 0;
  taxes: number = 0;
  loading: boolean = true;
  error: string = "";
  isSubmitting: boolean = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.checkInDate = params["checkIn"] || "";
      this.checkOutDate = params["checkOut"] || "";
      this.guests = +params["guests"] || 1;
      this.listingId = params["listingId"] || "";

      if (this.listingId) {
        this.loadListing();
      } else {
        this.error = "No listing selected";
        this.loading = false;
      }
    });

    this.bookingForm = this.fb.group({
      cardNumber: [
        "",
        [Validators.required, Validators.pattern("^[0-9]{16}$")],
      ],
      holderName: ["", Validators.required],
      expiryMonth: [
        "",
        [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])$")],
      ],
      expiryYear: ["", [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      cvv: ["", [Validators.required, Validators.pattern("^[0-9]{3,4}$")]],
      selectedGuests: [this.guests, Validators.min(1)],
    });
  }

  loadListing() {
    this.listingService.getListingByPublicId(this.listingId).subscribe({
      next: (data) => {
        this.listing = data;
        this.price = data.price;
        this.calculateTotal();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading listing:", err);
        this.error = "Failed to load listing details";
        this.loading = false;
      },
    });
  }

  calculateTotal() {
    if (this.checkInDate && this.checkOutDate && this.price) {
      const start = new Date(this.checkInDate);
      const end = new Date(this.checkOutDate);
      this.numberOfNights = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
      this.totalPrice = this.numberOfNights * this.price;
      this.taxes = Math.round(this.totalPrice * 0.1);
    }
  }

  onBook() {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = "";

    const reservation: ReservationRequest = {
      listingId: this.listingId,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      guests: this.guests,
      totalPrice: this.totalPrice + this.taxes,
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.router.navigate(["/profile", this.authService.getPublicId()]);
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 401) {
          this.error = "Your session has expired. Please login again.";
          this.router.navigate(["/login"], {
            queryParams: { returnUrl: this.router.url },
          });
        } else {
          this.error =
            error.error?.message ||
            "Failed to create reservation. Please try again.";
        }
      },
    });
  }

  updateGuests() {
    this.guests = this.bookingForm.get("selectedGuests")?.value;
    this.calculateTotal();
  }

  updateDates() {
    const checkIn = (document.getElementById("checkInDate") as HTMLInputElement)
      ?.value;
    const checkOut = (
      document.getElementById("checkOutDate") as HTMLInputElement
    )?.value;

    if (checkIn && checkOut) {
      this.checkInDate = checkIn;
      this.checkOutDate = checkOut;
      this.calculateTotal();
    }
  }
}
