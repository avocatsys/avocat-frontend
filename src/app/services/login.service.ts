import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

  logIn(data) {    
    return this.http.post<Credentials>(`${this.url}/v1/authentication/token`, data);
  }

  resetPassword(data) {
    return this.http.put(
      `${this.url}/v1/password/reset`,
      data,
      { headers: new HttpHeaders().set('Authorization', `${localStorage.getItem("_tt")}`)}
    );
  }
  
  forgotPassword(data) {
    return this.http.post(
      `${this.url}/v1/password/forgot`,
      data
    );
  }
}
