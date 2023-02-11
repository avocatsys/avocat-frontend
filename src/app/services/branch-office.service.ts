import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BranchOffice, Pageable } from "../models/branch-office.models";
import { Security } from "../utils/security.utils";

@Injectable({
  providedIn: "root",
})
export class BranchOfficeService {
  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly customerId = Security.getCustomerId();

  save(data: BranchOffice): Observable<BranchOffice> {
    return this.http.post<BranchOffice>(
      `${this.url}/v1/customer/${this.customerId}/branch-offices`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  update(data: BranchOffice) {    
    return this.http.put<BranchOffice>(
      `${this.url}/v1/customer/${this.customerId}/branch-offices`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  load() {    
    return this.http.get<Pageable>(
      `${this.url}/v1/customer/${this.customerId}/branch-offices`,
      { headers: Security.composeHeaders() }
    );
  }

  findById(uuid: string) {
    return this.http.get<BranchOffice>(
      `${this.url}/v1/customer/${this.customerId}/branch-offices/${uuid}`,
      { headers: Security.composeHeaders() }
    );
  }
}
