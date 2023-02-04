import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { Security } from "./utils/security.utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  layoutMode = "overlay";

  layoutColor = "light";

  darkMenu = false;

  isRTL = false;

  inputStyle = "filled";

  ripple = true;

  private url = "http://localhost:8080/avocat";

  constructor(
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.validToken();
  }

  validToken() {
    const token = Security.getToken();

    if (token == null || token == "") {
      this.router.navigate(["/login"]);
    } else {
      this.http
        .get(`${this.url}/v1/authentication/token/${token}`)
        .subscribe({
          next: (data) => {
            this.router.navigate(["/dash"]);
          },
          error: (data) => {
            this.router.navigate(["/login"]);
            Security.clear();
          },
        });
    }
  }
}
