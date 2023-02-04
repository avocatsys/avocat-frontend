import { HttpHeaders } from "@angular/common/http";
import { Credentials } from "../models/account.models";

export class Security {

  public static composeHeaders() {
    const token = localStorage.getItem('user.token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  public static setCredentials(credentials: Credentials) {    
    localStorage.setItem("user.token", credentials.token);
    localStorage.setItem("_ci", btoa(credentials.customerId));
    localStorage.setItem("_boi", btoa(credentials.branchOfficeId));
    localStorage.setItem("_un", btoa(credentials.username));
  }

  public static getToken(): string {
    const data = localStorage.getItem("user.token");
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public static getCustomerId(): string {
    const data = localStorage.getItem('_ci');
    if (data) {
        return atob(data);
    } else {
        return null;
    }
  }

  public static getBranchOfficeId(): string {
    const data = localStorage.getItem('_boi');
    if (data) {
        return atob(data);
    } else {
        return null;
    }
  }

  public static getUsername(): string {
    const data = localStorage.getItem('_un');
    if (data) {
        return atob(data);
    } else {
        return null;
    }
  }

  public static hasToken(): boolean {
    if (this.getToken()) return true;
    else return false;
  }

  public static clear() {
    localStorage.removeItem("user.token");
    localStorage.removeItem("_ci");
    localStorage.removeItem("_un");    
  }
}
