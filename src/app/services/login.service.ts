import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Credentials } from "../models/account.models";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private url = "http://localhost:8080/avocat";

  constructor(private http: HttpClient) {}

  signUp(data) {
    return this.http.post(`${this.url}/v1/customers/signup`, data);
  }

  logIn(data): Observable<Credentials> {
    return this.http.post<Credentials>(`${this.url}/v1/authentication/token`, data);
  }
}
