import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BranchOffice } from "../models/branch-office.models";
import { Security } from "../utils/security.utils";

@Injectable({
  providedIn: "root",
})
export class BranchOfficeService {
  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly customerId = Security.getCustomerId();

  public save(data): Observable<BranchOffice> {
    debugger
    return this.http.post<BranchOffice>(
      `${this.url}/v1/customer/${this.customerId}/branch-offices`,
      data,
      { headers: Security.composeHeaders() }
    );
  }
}
