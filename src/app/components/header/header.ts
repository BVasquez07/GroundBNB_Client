import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService, User } from "../../core/services/authService";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterLinkActive, CommonModule, NgOptimizedImage],
  templateUrl: "./header.html",
  styleUrl: "./header.scss",
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  userName: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.userName = user?.fullName || user?.firstName || "";
    });
  }

  logout() {
    this.authService.logout();
  }
}
