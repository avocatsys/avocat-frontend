import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Group, PageableGroup } from "../models/group.models";
import { Security } from "../utils/security.utils";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  constructor(private http: HttpClient) {}

  private url = "http://localhost:8080/avocat";

  private readonly branchOfficeId = Security.getBranchOfficeId();

  save(data: Group) {
    return this.http.post<Group>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/groups`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  update(data: Group) {
    return this.http.put<Group>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/groups`,
      data,
      { headers: Security.composeHeaders() }
    );
  }

  load() {
    return this.http.get<PageableGroup>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/groups`,
      { headers: Security.composeHeaders() }
    );
  }

  findById(uuid: string) {
    return this.http.get<Group>(
      `${this.url}/v1/branch-office/${this.branchOfficeId}/groups/${uuid}`,
      { headers: Security.composeHeaders() }
    );
  }
}
