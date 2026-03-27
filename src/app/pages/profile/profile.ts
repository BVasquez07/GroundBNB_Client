import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  public pastExperienceReviews: Array<any> = [
    {
      gaveRating: true,
      experienceTitle: 'Paint and Sip',
      Image: 'assets/event1.jpg',
      price: 4,
      rating: 5,
    },
    {
      gaveRating: true,
      experienceTitle: 'Beach House',
      Image: 'assets/house1.jpg',
      price: 4,
      rating: 5,
    },
    {
      gaveRating: false,
      experienceTitle: 'Cabin out in Seattle, WA',
      Image: 'assets/house2.jpg',
      price: 4,
      rating: 5,
    },
  ];  
}
