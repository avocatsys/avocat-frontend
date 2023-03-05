import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company, PageableCompany } from "../models/company.models";
import { User } from "../models/user.models";
import { Security } from "../utils/security.utils";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly branchOfficeId = Security.getBranchOfficeId();
  private readonly customerId = Security.getCustomerId();

  save(data: User) {
    return this.http.post<Company>(
      `${this.url}/v1/customer/${this.customerId}/branch-office/${this.branchOfficeId}/contracts`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  update(data: User) {
    return this.http.put<Company>(
      `${this.url}/v1/customer/${this.customerId}/contracts`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  load() {
    return this.http.get<PageableCompany>(
      `${this.url}/v1/customer/${this.customerId}/contracts`,
      { headers: Security.composeHeaders() }
    );
  }

  findById(uuid: string) {
    return this.http.get<Company>(
      `${this.url}/v1/customer/${this.customerId}/contracts/${uuid}`,
      { headers: Security.composeHeaders() }
    );
  }
  
  delete(uuid: string) {
    return this.http.delete(
      `${this.url}/v1/customer/${this.customerId}/branch-office/${this.branchOfficeId}/contracts/${uuid}`,
      { headers: Security.composeHeaders() }
    );
  }
}
