import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableUser, User } from '../models/user.models';
import { Security } from '../utils/security.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly branchOfficeId = Security.getBranchOfficeId();

  save(data: User) {
    return this.http.post<User>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/users`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  update(data: User) {
    return this.http.put<User>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/users`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  load() {
    return this.http.get<PageableUser>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/users`,
      { headers: Security.composeHeaders() }
    );
  }

  findById(uuid: string) {
    return this.http.get<User>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/users/${uuid}`,
      { headers: Security.composeHeaders() }
    );
  }
}
