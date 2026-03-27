import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroImage } from '../../components/hero-image/hero-image';

@Component({
  selector: "app-home",
  imports: [CommonModule, HeroImage, RouterLink],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class Home {}
