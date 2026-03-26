import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/authService";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.html",
  styleUrls: ["./profile.scss"],
})
export class Profile implements OnInit {
  publicId: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.publicId = this.route.snapshot.paramMap.get("publicId") || "";

    this.route.queryParams.subscribe((params) => {
      if (params["token"]) {
        this.authService.handleOAuthCallback({
          token: params["token"],
          publicId: this.publicId,
          email: params["email"],
          firstName: params["firstName"],
          lastName: params["lastName"],
        });

        this.router.navigate(["/profile", this.publicId], { replaceUrl: true });
      }
    });
  }
}
