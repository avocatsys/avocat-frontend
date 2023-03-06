import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contract, PageableContract } from "../models/contract.models";
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

  save(data: Contract, companyId: string) {
    return this.http.post<Contract>(
      `${this.url}/v1/customer/${this.customerId}/branch-office/${this.branchOfficeId}/company/${companyId}/contracts`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  update(data: Contract, companyId: string) {
    return this.http.put<Contract>(
      `${this.url}/v1/customer/${this.customerId}/company/${companyId}/contracts`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  load() {
    return this.http.get<PageableContract>(
      `${this.url}/v1/customer/${this.customerId}/contracts`,
      { headers: Security.composeHeaders() }
    );
  }

  findById(uuid: string) {
    return this.http.get<Contract>(
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
