import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listing',
  imports: [RouterLink, CommonModule],
  templateUrl: './listing.html',
  styleUrl: './listing.scss',
})
export class Listing {
  public toRender: Array<any> = [
    {
      id: 1,
      title: 'Cozy Cabin in the Woods',
      description: 'A charming cabin surrounded by nature, perfect for a weekend getaway.',
      price: 120,
      imageUrl: '/assets/house1.jpg'
    },
    {
      id: 2,
      title: 'Modern Apartment in the City',
      description: 'A sleek apartment located in the heart of downtown, close to all amenities.',
      price: 200,
      imageUrl: '/assets/house2.jpg'
    },
    {
      id: 3,
      title: 'Beachfront Villa',
      description: 'A luxurious villa with stunning ocean views, ideal for a relaxing vacation.',
      price: 350,
      imageUrl: '/assets/house3.jpg'
    }
  ];
}
