import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-detail',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './listing-detail.html',
  styleUrl: './listing-detail.scss',
})
export class ListingDetail {
  private activatedRoute = inject(ActivatedRoute);
  public listingId: string | null = this.activatedRoute.snapshot.paramMap.get('id')
  checkInDate: string | null = null
  checkOutDate: string | null = null;
  guests: string | null = null;
  
}
