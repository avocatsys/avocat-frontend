import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageablePrivilege } from '../models/privilege.models';
import { Security } from '../utils/security.utils';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly branchOfficeId = Security.getBranchOfficeId();

  load() {
    return this.http.get<PageablePrivilege>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/privileges`,
      { headers: Security.composeHeaders() }
    );
  }
}
