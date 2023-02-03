import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { Security } from "./utils/security.utils";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnInit {
  public username: string;

  constructor(public appMain: AppMainComponent) {}

  ngOnInit(): void {
    this.username = Security.getUsername();
  }
}
