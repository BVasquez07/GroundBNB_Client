import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListingService } from "../../core/services/listingService";
import { Listing } from "../listing/listing";

@Component({
  selector: "app-listing-detail",
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: "./listing-detail.html",
  styleUrl: "./listing-detail.scss",
})
export class ListingDetail implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private listingService = inject(ListingService);

  listingData: Listing | null = null;
  loading: boolean = true;
  error: string = "";

  checkInDate: string = "";
  checkOutDate: string = "";
  guests: string = "1";
  nights: number = 0;
  totalPrice: number = 0;
  bookingError: string = "";

  amenities: string[] = [
    "Fast Wi-Fi",
    "Air conditioning",
    "Full kitchen",
    "Free parking",
    "Dedicated workspace",
    "Smart TV",
    "Washer and dryer",
    "Heating",
    "Self check-in",
    "Patio or balcony",
    "BBQ grill",
    "Pet friendly",
  ];

  latestReviews: any[] = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const publicId = params.get("publicId");

      if (publicId) {
        this.loading = true;
        this.loadListing(publicId);
      } else {
        this.error = "Property not found";
        this.loading = false;
      }
    });
  }

  loadListing(publicId: string) {
    this.listingService.getListingByPublicId(publicId).subscribe({
      next: (data) => {
        this.listingData = data;

        if (data.reviews && data.reviews.length > 0) {
          this.latestReviews = data.reviews.map((review) => ({
            title: review.rating >= 4 ? "Great experience!" : "Good stay",
            body: review.comment,
            reviewer: review.customerName,
            date: review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : "Recently",
            rating: review.rating,
          }));
        }

        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load property details";
        this.loading = false;
      },
    });
  }

  getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = "";
    for (let i = 0; i < fullStars; i++) stars += "★";
    if (hasHalf) stars += "½";
    while (stars.length < 5) stars += "☆";
    return stars;
  }

  today = new Date().toISOString().split("T")[0];

  onDateChange(): void {
    this.bookingError = "";
    this.nights = 0;
    this.totalPrice = 0;

    if (!this.checkInDate || !this.checkOutDate || !this.listingData) {
      return;
    }

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      this.bookingError = "Check-in date cannot be in the past.";
      return;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / msPerDay,
    );

    if (diffDays <= 0) {
      this.bookingError = "Check-out must be after check-in.";
      return;
    }

    this.nights = diffDays;
    this.totalPrice = this.nights * this.listingData.price;
  }
}
