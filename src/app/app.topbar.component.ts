import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppMainComponent } from "./app.main.component";
import { Security } from "./utils/security.utils";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnInit {
  public name: string;

  constructor(public appMain: AppMainComponent, private router: Router) {}

  ngOnInit(): void {
    this.name = Security.getUsername();
  }

  logout(){
    Security.clear();
    this.router.navigate(["/login"]);
  }

}
