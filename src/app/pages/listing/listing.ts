import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ListingService, Review } from "../../core/services/listingService";

export interface ListingData {
  publicId: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  mainImageUrl: string;
  avgRating: number;
  reviewCount: number;
  reviews: Review[];
}

@Component({
  selector: "app-listing",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./listing.html",
  styleUrl: "./listing.scss",
})
export class Listing implements OnInit {
  private listingService = inject(ListingService);
  private readonly localListingImages: string[] = [
    "/assets/listings/house1.jpg",
    "/assets/listings/house2.jpg",
    "/assets/listings/house3.jpg",
    "/assets/listings/event1.jpg",
  ];

  allListings: ListingData[] = [];
  filteredListings: ListingData[] = [];
  error: string = "";

  searchQuery: string = "";

  filters = {
    minPrice: null as number | null,
    maxPrice: null as number | null,
    minRating: null as number | null,
    city: "",
  };

  cities: string[] = [];

  ngOnInit() {
    this.loadListings();
  }

  loadListings() {
    this.listingService.getAllListings().subscribe({
      next: (data) => {
        this.allListings = data;
        this.filteredListings = [...data];
        this.extractCities();
      },
      error: () => {
        this.error = "Failed to load listings";
      },
    });
  }

  extractCities() {
    const uniqueCities = new Set<string>();
    this.allListings.forEach((listing) => {
      uniqueCities.add(listing.city);
    });
    this.cities = Array.from(uniqueCities).sort();
  }

  applyFilters() {
    let results = [...this.allListings];
    const minPrice = this.parseFilterNumber(this.filters.minPrice);
    const maxPrice = this.parseFilterNumber(this.filters.maxPrice);
    const minRating = this.parseFilterNumber(this.filters.minRating);

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.city.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query),
      );
    }

    if (this.filters.city) {
      results = results.filter(
        (listing) =>
          listing.city.toLowerCase() === this.filters.city?.toLowerCase(),
      );
    }

    if (minPrice !== null) {
      results = results.filter((listing) => listing.price >= minPrice);
    }

    if (maxPrice !== null) {
      results = results.filter((listing) => listing.price <= maxPrice);
    }

    if (minRating !== null) {
      results = results.filter((listing) => listing.avgRating >= minRating);
    }

    this.filteredListings = results;
  }

  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = "";
    this.filters = {
      minPrice: null,
      maxPrice: null,
      minRating: null,
      city: "",
    };
    this.applyFilters();
  }

  private parseFilterNumber(value: number | string | null): number | null {
    if (value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = "";
    for (let i = 0; i < fullStars; i++) stars += "*";
    if (hasHalf) stars += "1/2";
    while (stars.length < 5) stars += ".";
    return stars;
  }

  getListingImage(
    listing: Partial<ListingData> | null | undefined,
    fallbackIndex: number,
  ): string {
    const firstFive = this.listingService.getFirstFivePublicIds();
    if (listing?.publicId) {
      const index = firstFive.indexOf(listing.publicId);
      if (index !== -1) {
        return `/assets/listings/listing${index + 1}/main.png`;
      }
    }

    const key =
      listing?.publicId ||
      listing?.title ||
      listing?.city ||
      String(fallbackIndex);
    return this.localListingImages[this.getDeterministicIndex(key)];
  }

  private getDeterministicIndex(value: string): number {
    if (!value) {
      return 0;
    }
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash % this.localListingImages.length;
  }
}
