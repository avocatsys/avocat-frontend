import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { NewCustomer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  signUp(data) {
    return this.http.post<NewCustomer>("http://localhost:8080/avocat/v1/customers/signup", data);
  }
}
